"use client";

import { useState, useCallback } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";
import IncidentCard from "@/app/components/incidents/incident-card";
import IncidentDetail from "@/app/components/incidents/incident-detail";
import IncidentTimeline from "@/app/components/incidents/incident-timeline";
import IncidentResponse from "@/app/components/incidents/incident-response";
import { incidents } from "@/app/data/incident-data";

const summaryMetrics = [
  { label: "Active Incidents", value: "3" },
  { label: "Critical", value: "1" },
  { label: "Affected Services", value: "6" },
  { label: "Signals Correlated", value: "27" },
];

export default function IncidentsPage() {
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

  const toggleIncident = (id: string) => {
    setExpandedIncident((prev) => (prev === id ? null : id));
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed("Signals refreshed just now");
    }, 1500);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
              Incident Command Center
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Active Incidents
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Monitor active incidents, correlate investigation signals, and
              prioritize what needs attention.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Signals"}
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-resolved-500" />
              <span className="text-xs text-foreground-tertiary">
                Signal monitor · Online
              </span>
            </div>
            {lastRefreshed && (
              <span className="text-[10px] text-foreground-muted">
                {lastRefreshed}
              </span>
            )}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {summaryMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-surface border border-border rounded-lg p-4 shadow-xs"
            >
              <div className="text-xs font-medium text-foreground-tertiary uppercase tracking-wide mb-1">
                {metric.label}
              </div>
              <div className="text-2xl font-semibold text-foreground">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Active Incidents */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Active Incidents
            </h3>
            <p className="text-xs text-foreground-tertiary mt-0.5">
              Incidents requiring attention across connected services.
            </p>
          </div>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id}>
                <IncidentCard
                  incident={incident}
                  isExpanded={expandedIncident === incident.id}
                  onToggle={() => toggleIncident(incident.id)}
                />
                {expandedIncident === incident.id && incident.id === "#0027" && (
                  <IncidentDetail />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Incident Timeline + Response */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncidentTimeline />
          <IncidentResponse />
        </div>

        {/* AI Incident Summary */}
        <div className="bg-ai-50 border border-ai-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-ai-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-ai-600" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ai-700 mb-1">
                AI Incident Summary
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Three authentication-related investigations share a common session
                recovery signal. The strongest correlated evidence points to
                expired sessions reaching validation without a refresh boundary.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Correlation confidence
                  </div>
                  <div className="text-sm font-semibold text-ai-600">94%</div>
                </div>
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Related cases
                  </div>
                  <div className="text-sm font-semibold text-foreground">3</div>
                </div>
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Affected services
                  </div>
                  <div className="text-sm font-semibold text-foreground">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
