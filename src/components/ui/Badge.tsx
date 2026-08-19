import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-border bg-background-subtle text-muted dark:bg-surface-raised",
  accent: "border-accent/30 bg-accent-tint text-accent",
  outline: "border-border-strong bg-transparent text-subtle",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
