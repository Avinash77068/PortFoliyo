import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60" />

      <Container className="text-center">
        <p className="font-mono text-sm tracking-[0.16em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-4 text-heading font-semibold text-foreground">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          The link may be out of date. Everything worth seeing is on the home
          page.
        </p>
        <Button
          href="/"
          size="lg"
          className="mt-8"
          leading={<ArrowLeft aria-hidden className="h-4 w-4" />}
        >
          Back to portfolio
        </Button>
      </Container>
    </main>
  );
}
