const PDF_FILENAME = "Jevon-Christopher-Loanda-Resume.pdf";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  let browser;

  try {
    const [{ launch }, { env }] = await Promise.all([
      import("@cloudflare/playwright"),
      import("cloudflare:workers"),
    ]);

    browser = await launch(env.BROWSER);
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const resumeUrl = new URL("/resume", request.url);

    await page.goto(resumeUrl.href, {
      waitUntil: "networkidle",
      timeout: 120_000,
    });
    await page.evaluate(() => document.fonts.ready);

    const sheet = page.locator(".resume-sheet");
    if ((await sheet.count()) !== 1) {
      throw new Error("Expected exactly one .resume-sheet on /resume.");
    }

    const pdf = await page.pdf({
      format: "A4",
      displayHeaderFooter: false,
      printBackground: true,
      preferCSSPageSize: true,
    });
    const pdfBody = Uint8Array.from(pdf).buffer;

    return new Response(pdfBody, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="${PDF_FILENAME}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Failed to generate resume PDF with Cloudflare Browser Rendering.", error);
    return new Response("Resume PDF is temporarily unavailable.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } finally {
    await browser?.close();
  }
}
