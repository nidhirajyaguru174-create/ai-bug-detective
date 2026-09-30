import { Bug, Clock } from "lucide-react";

interface InvestigationCardProps {
  id: number;
  title: string;
  project: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  progress: number;
  location: string;
  lastActivity: string;
}

const severityConfig = {
  critical: {
    dot: "bg-critical-500",
    text: "text-critical-600",
  },
  high: {
    dot: "bg-high-500",
    text: "text-high-600",
  },
  medium: {
    dot: "bg-medium-500",
    text: "text-medium-600",
  },
  low: {
    dot: "bg-info-500",
    text: "text-info-600",
  },
};

export default function InvestigationCard({
  id,
  title,
  project,
  severity,
  status,
  progress,
  location,
  lastActivity,
}: InvestigationCardProps) {
  const config = severityConfig[severity];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow duration-150">
      {/* Top row: severity + case ID + last activity */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className={`text-xs font-medium ${config.text}`}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </span>
          <span className="text-xs font-mono text-foreground-muted">
            #{String(id).padStart(4, "0")}
          </span>
          <span className="text-xs text-foreground-muted">·</span>
          <span className="text-xs text-foreground-secondary">{project}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-tertiary">
          <Clock className="w-3 h-3" />
          {lastActivity}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-foreground mb-2">{title}</h4>

      {/* Status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-foreground-secondary">{status}</span>
        <span className="text-xs font-medium text-foreground">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-tertiary rounded-full mb-3">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5">
        <Bug className="w-3 h-3 text-foreground-muted" />
        <span className="text-xs font-mono text-foreground-tertiary">{location}</span>
      </div>
    </div>
  );
}
