"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Incident } from "@/app/data/incident-data";

const severityConfig = {
  critical: { dot: "bg-critical-500", text: "text-critical-600", border: "border-critical-200" },
  high: { dot: "bg-high-500", text: "text-high-600", border: "border-high-200" },
  medium: { dot: "bg-medium-500", text: "text-medium-600", border: "border-medium-200" },
};

interface IncidentCardProps {
  incident: Incident;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function IncidentCard({ incident, isExpanded, onToggle }: IncidentCardProps) {
  const config = severityConfig[incident.severity];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-surface-secondary/50 transition-colors duration-150"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-medium text-foreground-muted">
                INCIDENT {incident.id}
              </span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${config.border} ${config.text} bg-surface`}>
                {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
              </span>
              <span className="text-[10px] text-foreground-tertiary">
                {incident.status}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-foreground">
              {incident.title}
            </h4>
            <p className="text-xs text-foreground-tertiary mt-0.5">
              Detected {incident.detected}
            </p>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-foreground-muted shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-foreground-muted shrink-0" />
          )}
        </div>

        {/* Affected services */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {incident.affectedServices.map((service) => (
            <span
              key={service}
              className="text-[10px] font-mono px-2 py-0.5 bg-surface-secondary border border-border rounded text-foreground-secondary"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3">
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">Related Cases</div>
            <div className="text-sm font-semibold text-foreground">{incident.relatedCases}</div>
          </div>
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">Pattern</div>
            <div className="text-xs font-medium text-foreground truncate max-w-[140px]">
              {incident.pattern}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">AI Correlation</div>
            <div className="text-sm font-semibold text-ai-600">{incident.aiCorrelation}%</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-foreground-secondary leading-relaxed mt-3">
          {incident.description}
        </p>
      </button>
    </div>
  );
}
