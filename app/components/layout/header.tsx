"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/cases": "Cases",
  "/investigate": "Investigate",
  "/ai-console": "AI Console",
  "/replay": "Replay",
  "/compare": "Compare",
  "/patterns": "Patterns",
  "/incidents": "Incidents",
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/") return pageTitles["/"];
    if (pathname.startsWith("/investigate/case-")) return "Case Report";
    for (const [prefix, title] of Object.entries(pageTitles)) {
      if (prefix !== "/" && pathname.startsWith(prefix)) return title;
    }
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6 bg-surface border-b border-border shrink-0">
      {/* Left: menu + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg text-foreground-secondary hover:bg-surface-secondary hover:text-foreground transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base font-semibold text-foreground truncate">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* Right: search, notifications, avatar */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <div className="hidden sm:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-tertiary pointer-events-none" />
            <input
              type="text"
              placeholder="Search cases, errors..."
              className="w-56 lg:w-64 pl-9 pr-4 py-2 text-sm bg-surface-secondary border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-foreground-secondary hover:bg-surface-secondary hover:text-foreground transition-colors"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold hover:bg-primary-200 transition-colors"
          aria-label="User menu"
          title="Account"
        >
          AB
        </button>
      </div>
    </header>
  );
}
