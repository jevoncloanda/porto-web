import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import process from "node:process";

import { chromium } from "playwright";

const root = process.cwd();
const filename = "Jevon-Christopher-Loanda-Resume.pdf";
const outputPath = path.join(root, "public", filename);
const expectedMarker = 'class="resume-sheet';

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function getAvailablePort() {
  const server = createServer();
  server.unref();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Could not reserve a local port for resume PDF generation.");
  }

  const port = address.port;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  return port;
}

async function isResumeServer(baseUrl, timeout = 1_000) {
  try {
    const response = await fetch(`${baseUrl}/resume`, {
      signal: AbortSignal.timeout(timeout),
    });
    if (!response.ok) return false;

    const html = await response.text();
    return html.includes(expectedMarker) && html.includes("Jevon Christopher Loanda");
  } catch {
    return false;
  }
}

async function findRunningResumeServer() {
  if (process.env.RESUME_BASE_URL) {
    const configuredUrl = process.env.RESUME_BASE_URL.replace(/\/$/, "");
    if (!(await isResumeServer(configuredUrl, 10_000))) {
      throw new Error(`RESUME_BASE_URL does not serve this portfolio resume: ${configuredUrl}`);
    }
    return configuredUrl;
  }

  for (let port = 3000; port <= 3010; port += 1) {
    const candidate = `http://127.0.0.1:${port}`;
    if (await isResumeServer(candidate)) return candidate;
  }

  return null;
}

async function startResumeServer() {
  const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
  if (!existsSync(nextCli)) {
    throw new Error("Next.js is not installed. Run npm install first.");
  }

  const port = await getAvailablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const logs = [];
  const child = spawn(
    process.execPath,
    [nextCli, "dev", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: root,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const capture = (chunk) => {
    logs.push(chunk.toString());
    if (logs.join("").length > 8_000) logs.shift();
  };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);

  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js exited before the resume loaded.\n${logs.join("").trim()}`);
    }
    if (await isResumeServer(baseUrl, 5_000)) return { baseUrl, child };
    await delay(500);
  }

  child.kill();
  throw new Error(`Timed out waiting for ${baseUrl}/resume.\n${logs.join("").trim()}`);
}

async function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  child.kill();
  await Promise.race([once(child, "exit"), delay(5_000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

let browser;
let ownedServer;

try {
  let baseUrl = await findRunningResumeServer();
  if (!baseUrl) {
    const started = await startResumeServer();
    baseUrl = started.baseUrl;
    ownedServer = started.child;
  }

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle", timeout: 120_000 });
  await page.evaluate(() => document.fonts.ready);

  const sheet = page.locator(".resume-sheet");
  if ((await sheet.count()) !== 1) {
    throw new Error("Expected exactly one .resume-sheet on /resume.");
  }

  // Next.js development UI is not resume content and must never enter the PDF.
  await page.locator("nextjs-portal").evaluateAll((elements) => {
    for (const element of elements) element.remove();
  });

  await mkdir(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log(`Generated ${path.relative(root, outputPath)}`);
} finally {
  await browser?.close();
  await stopServer(ownedServer);
}
