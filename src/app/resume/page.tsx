import type { Metadata } from "next";

import { PrintButton } from "@/components/resume/PrintButton";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@content/profile";

import "./resume.css";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.title}.`,
  pathname: "/resume",
});

export default function ResumePage() {
  return (
    <div className="pt-28 pb-24 sm:pt-36 sm:pb-32 print:p-0">
      <Container className="print:max-w-none print:px-0">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between print:hidden">
          <div className="max-w-reading">
            <Eyebrow>Resume</Eyebrow>
            <h1 className="mt-6 text-h1 font-semibold text-fg">{profile.name}</h1>
            <p className="mt-4 text-lead text-muted">
              Formatted for A4. Use the button to print or save it as a PDF — the
              page controls are removed from the printed document.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <PrintButton />
            <Button href="/" variant="secondary">
              Back to site
            </Button>
          </div>
        </div>

        <div className="flex justify-center print:block">
          <ResumeDocument />
        </div>
      </Container>
    </div>
  );
}
