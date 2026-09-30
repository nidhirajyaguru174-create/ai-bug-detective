"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ScanSearch,
  LayoutDashboard,
  FolderOpen,
  Microscope,
  Fingerprint,
  Siren,
  Brain,
  History,
  GitCompare,
  Settings,
  X,
} from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: FolderOpen },
  { name: "Investigate", href: "/investigate", icon: Microscope },
  { name: "AI Console", href: "/ai-console", icon: Brain },
  { name: "Replay", href: "/replay", icon: History },
  { name: "Compare", href: "/compare", icon: GitCompare },
  { name: "Patterns", href: "/patterns", icon: Fingerprint },
  { name: "Incidents", href: "/incidents", icon: Siren },
];

const systemNav: { name: string; href: string; icon: typeof Settings }[] = [];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
      isActive(href)
        ? "bg-primary-500/15 text-primary-300"
        : "text-sidebar-text-secondary hover:bg-sidebar-surface hover:text-sidebar-text"
    }`;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-sidebar-bg border-r border-sidebar-border
        flex flex-col
        transform transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-500/20 text-primary-400">
          <ScanSearch className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-sidebar-text truncate">
            AI Bug Detective
          </div>
          <div className="text-xs text-sidebar-text-secondary truncate">
            Developer Intelligence
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-auto lg:hidden p-1.5 rounded-lg text-sidebar-text-secondary hover:bg-sidebar-surface hover:text-sidebar-text transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-text-secondary">
            Main
          </div>
          <ul className="space-y-0.5">
            {mainNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={navLinkClass(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-text-secondary">
            System
          </div>
          <ul className="space-y-0.5">
            {systemNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={navLinkClass(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* AI Engine Status */}
      <div className="px-4 py-4 border-t border-sidebar-border shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-resolved-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-resolved-500" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-text-secondary">
              AI Engine
            </span>
            <span className="text-xs font-medium text-sidebar-text">
              Online · Ready
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
