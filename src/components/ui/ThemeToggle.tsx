"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/45 hover:bg-accent-tint hover:text-accent",
        className,
      )}
    >
      {/* Both icons render; only the active one is visible, so the swap cannot
          cause a layout shift or a hydration mismatch. */}
      <Sun
        aria-hidden
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
