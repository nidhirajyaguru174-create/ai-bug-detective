"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, ChevronRight, X, Sparkles } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";

interface CaseItem {
  id: string;
  title: string;
  project: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  progress: number;
  location: string;
  updated: string;
  aiAnalyzed?: boolean;
}

const cases: CaseItem[] = [
  {
    id: "#0042",
    title: "Authentication Failure",
    project: "Commerce API",
    severity: "critical",
    status: "Root Cause Identified",
    progress: 82,
    location: "AuthService → validateSession()",
    updated: "2 min ago",
    aiAnalyzed: true,
  },
  {
    id: "#0041",
    title: "Authentication Failure",
    project: "Payments API",
    severity: "high",
    status: "Root Cause Analysis",
    progress: 68,
    location: "AuthService → validateToken()",
    updated: "18 min ago",
  },
  {
    id: "#0040",
    title: "Null Reference in User Profile",
    project: "Customer Portal",
    severity: "high",
    status: "Evidence Collected",
    progress: 64,
    location: "ProfileController → getUser()",
    updated: "11 min ago",
  },
  {
    id: "#0039",
    title: "Stale UI State",
    project: "Analytics Dashboard",
    severity: "medium",
    status: "Fix Suggested",
    progress: 91,
    location: "Dashboard → useMetrics()",
    updated: "24 min ago",
  },
  {
    id: "#0038",
    title: "API Timeout",
    project: "Orders Service",
    severity: "medium",
    status: "Investigation In Progress",
    progress: 47,
    location: "OrderService → fetchOrders()",
    updated: "1 hour ago",
  },
];

const summaryMetrics = [
  { label: "Total Cases", value: "42", filter: null },
  { label: "Open", value: "7", filter: "open" },
  { label: "Critical", value: "3", filter: "critical" },
  { label: "Resolved", value: "32", filter: "resolved" },
];

const severityConfig = {
  critical: { dot: "bg-critical-500", text: "text-critical-600" },
  high: { dot: "bg-high-500", text: "text-high-600" },
  medium: { dot: "bg-medium-500", text: "text-medium-600" },
  low: { dot: "bg-info-500", text: "text-info-600" },
};

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

type SortOption = "recent" | "severity" | "progress";

function sortCases(cases: CaseItem[], sortBy: SortOption): CaseItem[] {
  const sorted = [...cases];
  switch (sortBy) {
    case "severity":
      sorted.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
      break;
    case "progress":
      sorted.sort((a, b) => b.progress - a.progress);
      break;
    case "recent":
    default:
      sorted.sort((a, b) => a.id.localeCompare(b.id));
      break;
  }
  return sorted;
}

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredCases = useMemo(() => {
    const query = search.toLowerCase();
    const filtered = cases.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(query) ||
        c.project.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.status.toLowerCase().includes(query);
      const matchesSeverity =
        severityFilter === "all" || c.severity === severityFilter;
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
    return sortCases(filtered, sortBy);
  }, [search, severityFilter, statusFilter, sortBy]);

  const hasActiveFilters =
    search !== "" || severityFilter !== "all" || statusFilter !== "all";

  const clearAllFilters = () => {
    setSearch("");
    setSeverityFilter("all");
    setStatusFilter("all");
  };

  const removeFilter = (type: "search" | "severity" | "status") => {
    if (type === "search") setSearch("");
    if (type === "severity") setSeverityFilter("all");
    if (type === "status") setStatusFilter("all");
  };

  const handleMetricClick = (filter: string | null) => {
    if (filter === "critical") {
      setSeverityFilter("critical");
      setStatusFilter("all");
    } else if (filter === "open") {
      setStatusFilter("Investigation In Progress");
      setSeverityFilter("all");
    } else if (filter === "resolved") {
      setStatusFilter("Fix Suggested");
      setSeverityFilter("all");
    }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
              Cases
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Investigation Cases
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Review, track, and continue debugging investigations.
            </p>
          </div>
          <Link
            href="/investigate"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Investigation
          </Link>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {summaryMetrics.map((metric) => (
            <button
              key={metric.label}
              onClick={() => handleMetricClick(metric.filter)}
              disabled={!metric.filter}
              className={`bg-surface border border-border rounded-lg p-4 shadow-xs text-left transition-colors duration-150 ${
                metric.filter
                  ? "hover:border-primary-300 hover:bg-primary-50/30 cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <div className="text-xs font-medium text-foreground-tertiary uppercase tracking-wide mb-1">
                {metric.label}
              </div>
              <div className="text-2xl font-semibold text-foreground">
                {metric.value}
              </div>
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-tertiary pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ID, title, project, location, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
              aria-label="Search cases"
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            aria-label="Filter by severity"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="Root Cause Identified">Root Cause Identified</option>
            <option value="Root Cause Analysis">Root Cause Analysis</option>
            <option value="Evidence Collected">Evidence Collected</option>
            <option value="Fix Suggested">Fix Suggested</option>
            <option value="Investigation In Progress">
              Investigation In Progress
            </option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            aria-label="Sort cases"
          >
            <option value="recent">Recently updated</option>
            <option value="severity">Severity</option>
            <option value="progress">Progress</option>
          </select>
        </div>

        {/* Active Filter Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-foreground-tertiary">
              Showing {filteredCases.length} of {cases.length} cases
            </span>
            {search && (
              <button
                onClick={() => removeFilter("search")}
                className="flex items-center gap-1 px-2 py-0.5 text-xs bg-surface-secondary border border-border rounded-full text-foreground-secondary hover:text-foreground hover:border-border-strong transition-colors"
                aria-label="Remove search filter"
              >
                Search: &quot;{search}&quot;
                <X className="w-3 h-3" />
              </button>
            )}
            {severityFilter !== "all" && (
              <button
                onClick={() => removeFilter("severity")}
                className="flex items-center gap-1 px-2 py-0.5 text-xs bg-surface-secondary border border-border rounded-full text-foreground-secondary hover:text-foreground hover:border-border-strong transition-colors"
                aria-label="Remove severity filter"
              >
                Severity: {severityFilter}
                <X className="w-3 h-3" />
              </button>
            )}
            {statusFilter !== "all" && (
              <button
                onClick={() => removeFilter("status")}
                className="flex items-center gap-1 px-2 py-0.5 text-xs bg-surface-secondary border border-border rounded-full text-foreground-secondary hover:text-foreground hover:border-border-strong transition-colors"
                aria-label="Remove status filter"
              >
                Status: {statusFilter}
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Case List */}
        <div className="space-y-3">
          {filteredCases.map((item) => {
            const config = severityConfig[item.severity];
            return (
              <Link
                key={item.id}
                href={`/investigate/case-${item.id.replace("#", "")}`}
                className="block bg-surface border border-border rounded-lg p-4 shadow-xs hover:shadow-sm hover:border-border-strong transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Case info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-medium text-foreground-muted">
                        {item.id}
                      </span>
                      {item.aiAnalyzed && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-ai-600 bg-ai-50 px-1.5 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" />
                          AI analyzed
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-foreground-tertiary">
                      {item.project}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="text-xs text-foreground-secondary">
                        Status:{" "}
                        <span className="text-foreground font-medium">
                          {item.status}
                        </span>
                      </span>
                      <span className={`text-xs font-medium ${config.text}`}>
                        {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                      </span>
                      <span className="text-xs text-foreground-secondary">
                        Progress:{" "}
                        <span className="font-mono text-foreground">
                          {item.progress}%
                        </span>
                      </span>
                    </div>
                    <div className="text-[11px] text-foreground-muted mt-1 font-mono">
                      {item.location}
                    </div>
                    <div className="text-[11px] text-foreground-muted mt-0.5">
                      Updated {item.updated}
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <ChevronRight className="w-4 h-4 text-foreground-muted shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}

          {/* Empty State */}
          {filteredCases.length === 0 && (
            <div className="text-center py-16 px-6 border border-dashed border-border-strong rounded-xl bg-surface">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-secondary mb-4 mx-auto">
                <Search className="w-5 h-5 text-foreground-tertiary" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                No investigations found
              </h3>
              <p className="text-sm text-foreground-tertiary mb-4">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors duration-150"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
