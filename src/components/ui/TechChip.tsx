import { BrandGlyph, brandHex } from "@/components/ui/BrandGlyph";
import type { BrandIconName } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

type TechChipProps = {
  name: string;
  icon: BrandIconName;
  className?: string;
};

/** Relative luminance, used to detect brand colours that vanish on dark. */
function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(
    (offset) => parseInt(value.slice(offset, offset + 2), 16) / 255,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Some brands are effectively black (Next.js, Express, GitHub). Those get a
 * neutral light tone in dark mode instead of disappearing into the background.
 */
function brandTints(icon: BrandIconName): { light: string; dark: string } {
  const hex = brandHex(icon);
  return {
    light: hex,
    dark: luminance(hex) < 0.16 ? "#f2f4f6" : hex,
  };
}

/**
 * Server-rendered on purpose: the hover treatment is pure CSS, so a list of
 * sixteen technologies costs zero client JavaScript.
 */
export function TechChip({ name, icon, className }: TechChipProps) {
  const tints = brandTints(icon);

  return (
    <li
      style={
        {
          "--brand-light": tints.light,
          "--brand-dark": tints.dark,
        } as React.CSSProperties
      }
      className={cn(
        "tech-chip group/chip flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-tint hover:shadow-card",
        className,
      )}
    >
      <BrandGlyph
        name={icon}
        className="h-[18px] w-[18px] text-subtle transition-colors duration-300 group-hover/chip:text-[var(--brand)]"
      />
      <span className="text-[13.5px] font-medium text-foreground">{name}</span>
    </li>
  );
}
