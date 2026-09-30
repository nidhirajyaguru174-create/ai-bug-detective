import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { incidentDetail } from "@/app/data/incident-data";

const severityDot = {
  critical: "bg-critical-500",
  high: "bg-high-500",
  medium: "bg-medium-500",
};

export default function IncidentDetail() {
  return (
    <div className="border-t border-border bg-surface-secondary/30 p-4">
      {/* Affected Services */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Affected Services
        </div>
        <div className="flex flex-wrap gap-1.5">
          {incidentDetail.affectedServices.map((service) => (
            <span
              key={service}
              className="text-[10px] font-mono px-2 py-1 bg-surface border border-border rounded text-foreground-secondary"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Correlated Cases */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Correlated Cases
        </div>
        <div className="space-y-1.5">
          {incidentDetail.correlatedCases.map((c) => {
            const isCase0042 = c.id === "#0042";
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-foreground-muted">
                    {c.id}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${severityDot[c.severity]}`} />
                  <span className="text-xs text-foreground">{c.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-foreground-tertiary">
                    {c.project}
                  </span>
                  <span className="text-[10px] font-mono text-foreground-secondary">
                    {c.progress}%
                  </span>
                </div>
              </>
            );

            if (isCase0042) {
              return (
                <Link
                  key={c.id}
                  href="/investigate/case-0042"
                  className="block bg-surface border border-border rounded px-3 py-2 hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div key={c.id} className="bg-surface border border-border rounded px-3 py-2">
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {/* Correlated Pattern */}
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Correlated Pattern
        </div>
        <Link
          href="/patterns"
          className="flex items-center justify-between bg-surface border border-border rounded px-3 py-2 hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
        >
          <div>
            <div className="text-xs font-medium text-foreground">
              {incidentDetail.pattern.name}
            </div>
            <div className="text-[10px] text-foreground-tertiary">
              Confidence: {incidentDetail.pattern.confidence}%
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-foreground-muted" />
        </Link>
      </div>
    </div>
  );
}
