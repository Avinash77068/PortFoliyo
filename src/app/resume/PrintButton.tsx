"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/Button";

/**
 * Uses the browser's own print dialog, which offers "Save as PDF" everywhere.
 * That keeps the resume in one place — the data files — with no PDF to
 * regenerate whenever a detail changes.
 */
export function PrintButton() {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      leading={<Printer aria-hidden className="h-4 w-4" />}
    >
      Download PDF
    </Button>
  );
}
