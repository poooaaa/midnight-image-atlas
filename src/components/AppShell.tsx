import { Link } from "@tanstack/react-router";
import { Aperture, Images, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Generate", icon: Sparkles },
  { to: "/gallery", label: "Gallery", icon: Images },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background md:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-card-border px-3 py-5 md:flex">
        <Brand />
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-bubble-hover hover:text-icon-hover"
              activeProps={{ className: "!bg-selected !text-heading" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto px-3 text-xs text-placeholder">Tahap 1 · Pratinjau UI</p>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-card-border bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <Brand />
        <nav className="flex rounded-lg border border-control-border bg-control p-0.5">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-icon-hover"
              activeProps={{ className: "!bg-selected !text-heading" }}
            >
              <Icon className="size-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-1 md:px-3">
      <div className="flex size-7 items-center justify-center rounded-lg border border-control-border bg-control">
        <Aperture className="size-4 text-icon-hover" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-heading">Image Studio</span>
    </div>
  );
}
