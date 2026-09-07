"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/Button";

/**
 * Opens the browser print dialog. "Save as PDF" from there produces the
 * A4 document — no PDF service or headless browser required.
 */
export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()}>
      <Printer size={16} aria-hidden />
      Print / Save as PDF
    </Button>
  );
}
