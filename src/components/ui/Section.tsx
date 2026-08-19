import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  /** Accessible name for the landmark, when no visible heading is linked. */
  label?: string;
  className?: string;
  /** Adds a hairline divider at the top edge. */
  bordered?: boolean;
};

/** Semantic section landmark with the shared vertical rhythm. */
export function Section({
  id,
  children,
  label,
  className,
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        bordered && "border-t border-border",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
