import { brandIcons, type BrandIconName } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

type BrandGlyphProps = {
  name: BrandIconName;
  className?: string;
  /** Decorative by default; pass a title to expose it to assistive tech. */
  title?: string;
};

/**
 * Renders an inlined 24x24 brand path. `currentColor` keeps it theme-aware;
 * consumers tint it with the brand hex on hover via the `--brand` custom
 * property set by `TechChip`.
 */
export function BrandGlyph({ name, className, title }: BrandGlyphProps) {
  const icon = brandIcons[name];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} />
    </svg>
  );
}

export function brandHex(name: BrandIconName): string {
  return brandIcons[name].hex;
}
