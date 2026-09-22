import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const wranglerConfig = path.join(root, "dist", "server", "wrangler.json");
const wranglerCli = path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const vinextCloudflareCli = path.join(
  root,
  "node_modules",
  "@vinext",
  "cloudflare",
  "dist",
  "cli.js",
);
const pdfOutput = path.join(root, "dist", "client", "resume.pdf");
const previewAlias = "resume-pdf-source";

function requiredEnvironmentVariable(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function runNodeCli(cli, args, { capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli, ...args], {
      cwd: root,
      env: process.env,
      stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    });

    let output = "";
    if (capture) {
      child.stdout.on("data", (chunk) => {
        const text = chunk.toString();
        output += text;
        process.stdout.write(text);
      });
      child.stderr.on("data", (chunk) => {
        const text = chunk.toString();
        output += text;
        process.stderr.write(text);
      });
    }

    child.once("error", reject);
    child.once("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`${path.basename(cli)} exited with code ${code ?? "unknown"}.`));
    });
  });
}

function parsePreviewUrl(output) {
  const plainOutput = output.replace(/\u001b\[[0-9;]*m/g, "");
  const match = plainOutput.match(/Version Preview Alias URL:\s*(https:\/\/\S+)/);
  if (!match) throw new Error("Wrangler did not return a Version Preview Alias URL.");
  return match[1];
}

async function waitForResume(previewUrl) {
  const resumeUrl = new URL("/resume", previewUrl).href;
  const deadline = Date.now() + 90_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(resumeUrl, { signal: AbortSignal.timeout(10_000) });
      if (response.ok && (await response.text()).includes('class="resume-sheet')) return resumeUrl;
    } catch {
      // Preview DNS and TLS provisioning can take a few seconds after upload.
    }

    await new Promise((resolve) => setTimeout(resolve, 3_000));
  }

  throw new Error(`Timed out waiting for staged resume at ${resumeUrl}.`);
}

async function generateResumePdf(resumeUrl) {
  const accountId = requiredEnvironmentVariable("CLOUDFLARE_ACCOUNT_ID");
  const apiToken = requiredEnvironmentVariable("CLOUDFLARE_API_TOKEN");
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/pdf`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: resumeUrl,
      emulateMediaType: "print",
      viewport: { width: 1280, height: 720 },
      gotoOptions: { waitUntil: "networkidle0", timeout: 60_000 },
      waitForSelector: { selector: ".resume-sheet", visible: true, timeout: 60_000 },
      pdfOptions: {
        format: "a4",
        displayHeaderFooter: false,
        printBackground: true,
        preferCSSPageSize: true,
        timeout: 60_000,
      },
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Cloudflare PDF API failed (${response.status}): ${details}`);
  }

  const pdf = new Uint8Array(await response.arrayBuffer());
  if (pdf.length < 1_000 || new TextDecoder().decode(pdf.subarray(0, 5)) !== "%PDF-") {
    throw new Error("Cloudflare PDF API returned an invalid PDF payload.");
  }

  await mkdir(path.dirname(pdfOutput), { recursive: true });
  await writeFile(pdfOutput, pdf);
  console.log(`Generated ${path.relative(root, pdfOutput)} from ${resumeUrl}.`);
}

requiredEnvironmentVariable("CLOUDFLARE_ACCOUNT_ID");
requiredEnvironmentVariable("CLOUDFLARE_API_TOKEN");

const uploadOutput = await runNodeCli(
  wranglerCli,
  [
    "versions",
    "upload",
    "--config",
    wranglerConfig,
    "--preview-alias",
    previewAlias,
  ],
  { capture: true },
);
const previewUrl = parsePreviewUrl(uploadOutput);
const resumeUrl = await waitForResume(previewUrl);

await generateResumePdf(resumeUrl);
await runNodeCli(vinextCloudflareCli, ["deploy", "--skip-build", "--config", wranglerConfig]);
