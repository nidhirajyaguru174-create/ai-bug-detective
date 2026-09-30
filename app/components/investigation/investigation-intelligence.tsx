"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Zap,
  Link,
  TrendingUp,
  Target,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

interface InsightBlockProps {
  label: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function InsightBlock({
  label,
  title,
  icon: Icon,
  iconColor,
  children,
  defaultExpanded = false,
}: InsightBlockProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-secondary/50 transition-colors duration-150 rounded-lg"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">
              {label}
            </div>
            <div className="text-sm font-medium text-foreground mt-0.5">
              {title}
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-foreground-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-foreground-muted" />
        )}
      </button>
      {expanded && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
}

const signals = [
  { title: "Expired session token", source: "Auth middleware" },
  { title: "Missing token refresh", source: "SessionManager" },
  { title: "401 Unauthorized", source: "Commerce API" },
];

const inspectionTargets = [
  {
    name: "SessionManager",
    description: "Verify refresh-before-validation behavior",
  },
  {
    name: "Authentication middleware",
    description: "Confirm expired-session recovery handling",
  },
  {
    name: "Dashboard request handler",
    description: "Confirm graceful handling of authentication failure",
  },
];

export default function InvestigationIntelligence() {
  return (
    <div>
      {/* Section header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Investigation Intelligence
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Signals and patterns identified from the available evidence.
        </p>
      </div>

      {/* Insight blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Primary Signal */}
        <InsightBlock
          label="Primary Signal"
          title="Expired session reaches validation"
          icon={Zap}
          iconColor="text-ai-600"
          defaultExpanded
        >
          <p className="text-xs text-foreground-secondary leading-relaxed mb-3">
            The strongest signal is the expired authentication token reaching
            validateSession() without an intermediate refresh attempt.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">
              Confidence
            </span>
            <span className="text-xs font-mono font-medium text-ai-600">
              94%
            </span>
          </div>
        </InsightBlock>

        {/* Correlated Evidence */}
        <InsightBlock
          label="Correlated Evidence"
          title="Connected signals"
          icon={Link}
          iconColor="text-amber-600"
        >
          <div className="space-y-2 mb-3">
            {signals.map((signal) => (
              <div
                key={signal.title}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-foreground">{signal.title}</div>
                  <div className="text-[10px] text-foreground-muted">
                    Source: {signal.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-foreground-muted">
            <span>3 signals</span>
            <span>→</span>
            <span>1 failure path</span>
          </div>
        </InsightBlock>

        {/* Pattern Detected */}
        <InsightBlock
          label="Pattern Detected"
          title="Authentication recovery gap"
          icon={TrendingUp}
          iconColor="text-amber-600"
        >
          <p className="text-xs text-foreground-secondary leading-relaxed mb-3">
            Requests using expired sessions consistently fail because the
            application validates the existing session before attempting
            recovery.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">
              Pattern confidence
            </span>
            <span className="text-xs font-medium text-amber-600">High</span>
          </div>
          <p className="text-[11px] text-foreground-muted italic">
            Similar response-handling gaps may exist in other authenticated
            flows.
          </p>
        </InsightBlock>

        {/* Next Inspection */}
        <InsightBlock
          label="Next Inspection"
          title="Inspect session refresh boundaries"
          icon={Target}
          iconColor="text-primary-600"
        >
          <div className="space-y-2">
            {inspectionTargets.map((target, index) => (
              <div key={target.name} className="flex items-start gap-2">
                <span className="text-[10px] font-mono font-medium text-primary-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-xs text-foreground">{target.name}</div>
                  <div className="text-[10px] text-foreground-muted">
                    {target.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InsightBlock>
      </div>

      {/* Why this matters callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-amber-700 mb-1">
              Why this matters
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              The failure is not isolated to token validation. The missing
              recovery path allows an expired session to propagate into
              downstream dashboard requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
