import Link from "next/link";

import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Rendered before the label, e.g. an icon. */
  leading?: React.ReactNode;
  /** Rendered after the label. */
  trailing?: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_1px_0_0_rgb(255_255_255/0.16)_inset] hover:bg-accent-hover hover:shadow-[0_8px_24px_-10px_var(--accent-ring)] active:translate-y-px",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-accent/45 hover:bg-accent-tint hover:text-accent active:translate-y-px",
  ghost: "text-muted hover:bg-accent-tint hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

function classesFor(variant: Variant, size: Size, className?: string): string {
  return cn(base, variants[variant], sizes[size], className);
}

/**
 * One button, three shapes. Renders an `<a>` for external targets, a
 * `next/link` for internal ones, and a `<button>` when there is no href.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      children,
      variant = "primary",
      size = "md",
      className,
      leading,
      trailing,
      ...anchorProps
    } = props;

    const classes = classesFor(variant, size, className);
    const content = (
      <>
        {leading}
        {children}
        {trailing}
      </>
    );

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          // mailto:/tel: should stay in the same tab so the handler can take over.
          target={/^(mailto|tel):/.test(href) ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={classes}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    size = "md",
    className,
    leading,
    trailing,
    ...buttonProps
  } = props;

  return (
    <button className={classesFor(variant, size, className)} {...buttonProps}>
      {leading}
      {children}
      {trailing}
    </button>
  );
}
