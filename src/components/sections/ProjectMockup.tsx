import type { ProjectPreview } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Hand-built UI mockups rather than screenshots or stock imagery. They are
 * decorative (`aria-hidden`) — every fact about a project lives in the text
 * beside them — and stylised on purpose so they never read as a real capture.
 */
export function ProjectMockup({
  preview,
  label,
  className,
}: {
  preview: ProjectPreview;
  /** Shown in the fake address bar / window title. */
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-background-subtle select-none",
        className,
      )}
    >
      <BrowserChrome label={label} />
      <div className="p-3 sm:p-4">
        {preview === "website" ? <WebsitePreview /> : null}
        {preview === "dashboard" ? <DashboardPreview /> : null}
        {preview === "wallet" ? <WalletPreview /> : null}
      </div>
    </div>
  );
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border bg-surface px-3 py-2.5">
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
      </div>
      <span className="ml-1 flex-1 truncate rounded-md bg-background-subtle px-2.5 py-1 font-mono text-[9.5px] text-subtle">
        {label}
      </span>
    </div>
  );
}

/** Neutral skeleton bar. */
function Bar({ className }: { className?: string }) {
  return <span className={cn("block rounded-full bg-border", className)} />;
}

function WebsitePreview() {
  return (
    <div className="space-y-3">
      {/* Site nav */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2">
        <Bar className="h-2 w-10 bg-accent/70" />
        <div className="ml-auto flex items-center gap-2">
          <Bar className="h-1.5 w-7" />
          <Bar className="h-1.5 w-9" />
          <Bar className="h-1.5 w-6" />
          <span className="h-4 w-12 rounded-full bg-accent/85" />
        </div>
      </div>

      {/* Hero + booking widget */}
      <div className="rounded-lg border border-border bg-surface p-3">
        <Bar className="h-2.5 w-3/5 bg-border-strong" />
        <Bar className="mt-2 h-2 w-2/5" />
        <div className="mt-3 grid grid-cols-[1fr_1fr_1fr_auto] gap-1.5 rounded-lg border border-border bg-background-subtle p-1.5">
          <span className="h-5 rounded bg-surface" />
          <span className="h-5 rounded bg-surface" />
          <span className="h-5 rounded bg-surface" />
          <span className="h-5 w-10 rounded bg-accent" />
        </div>
      </div>

      {/* Listing cards */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <span className="block h-9 bg-gradient-to-br from-border to-background-subtle" />
            <span className="block space-y-1.5 p-2">
              <Bar className="h-1.5 w-4/5" />
              <Bar className="h-1.5 w-2/5" />
              <Bar className="h-2 w-1/2 bg-accent/60" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex gap-3">
      {/* Sidebar */}
      <div className="hidden w-24 shrink-0 space-y-2 rounded-lg border border-border bg-surface p-2.5 sm:block">
        <Bar className="h-2 w-12 bg-accent/70" />
        <span className="block h-px bg-border" />
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} className="flex items-center gap-1.5 py-0.5">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded",
                index === 1 ? "bg-accent" : "bg-border",
              )}
            />
            <Bar
              className={cn(
                "h-1.5",
                index === 1 ? "w-12 bg-accent/50" : "w-10",
              )}
            />
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1 space-y-2.5">
        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-surface p-2"
            >
              <Bar className="h-1.5 w-8" />
              <Bar className="mt-1.5 h-2.5 w-11 bg-border-strong" />
              <svg
                viewBox="0 0 48 14"
                className="mt-1.5 h-3.5 w-full text-accent"
                fill="none"
              >
                <path
                  d="M1 11 L9 7 L17 9 L25 4 L33 6 L41 2 L47 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="rounded-lg border border-border bg-surface p-2.5">
          <div className="flex items-center justify-between">
            <Bar className="h-1.5 w-14" />
            <Bar className="h-1.5 w-8" />
          </div>
          <div className="mt-2.5 flex h-16 items-end gap-1.5">
            {[38, 62, 45, 78, 55, 92, 68, 84, 50, 72].map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={cn(
                  "flex-1 rounded-t-sm",
                  index === 5 ? "bg-accent" : "bg-border",
                )}
              />
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="space-y-1.5 rounded-lg border border-border bg-surface p-2.5">
          {[0, 1, 2].map((index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-border" />
              <Bar className="h-1.5 flex-1" />
              <Bar className="h-1.5 w-8" />
              <span
                className={cn(
                  "h-3 w-8 rounded-full",
                  index === 0 ? "bg-accent/80" : "bg-border",
                )}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletPreview() {
  return (
    <div className="space-y-3">
      {/* Balance card */}
      <div className="relative overflow-hidden rounded-xl border border-accent/25 bg-gradient-to-br from-accent-tint to-transparent p-3.5">
        <Bar className="h-1.5 w-14" />
        <div className="mt-2.5 flex items-end gap-2">
          <Bar className="h-4 w-28 bg-border-strong" />
          <Bar className="h-2 w-8 bg-accent/70" />
        </div>
        <div className="mt-3.5 flex gap-2">
          <span className="h-6 flex-1 rounded-lg bg-accent" />
          <span className="h-6 flex-1 rounded-lg border border-border bg-surface" />
        </div>
        <span className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-accent/10 blur-xl" />
      </div>

      {/* Connected wallet row */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2">
        <span className="h-3.5 w-3.5 rounded-full bg-accent" />
        <Bar className="h-1.5 w-16" />
        <Bar className="ml-auto h-1.5 w-10" />
      </div>

      {/* Token rows */}
      <div className="space-y-1.5 rounded-lg border border-border bg-surface p-2.5">
        {[0, 1, 2].map((index) => (
          <span key={index} className="flex items-center gap-2.5 py-1">
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-border-strong to-border" />
            <span className="flex-1 space-y-1">
              <Bar className="h-1.5 w-12" />
              <Bar className="h-1.5 w-8" />
            </span>
            <span className="space-y-1 text-right">
              <Bar className="ml-auto h-1.5 w-10" />
              <Bar
                className={cn(
                  "ml-auto h-1.5 w-6",
                  index === 0 ? "bg-accent/70" : undefined,
                )}
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
