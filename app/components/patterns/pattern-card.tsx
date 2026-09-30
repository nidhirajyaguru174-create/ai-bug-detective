"use client";

import { Key, Shield, Clock, Monitor, ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Pattern } from "@/app/data/pattern-data";

const categoryIcons: Record<string, LucideIcon> = {
  Authentication: Key,
  Reliability: Shield,
  Performance: Clock,
  Frontend: Monitor,
};

const statusConfig = {
  recurring: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  emerging: { bg: "bg-ai-50", text: "text-ai-700", border: "border-ai-200" },
};

interface PatternCardProps {
  pattern: Pattern;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PatternCard({ pattern, isExpanded, onToggle }: PatternCardProps) {
  const Icon = categoryIcons[pattern.category] || Shield;
  const status = statusConfig[pattern.status];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-surface-secondary/50 transition-colors duration-150"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-foreground-secondary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-medium text-foreground-muted">
                  PATTERN {String(pattern.id).padStart(2, "0")}
                </span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
                  {pattern.status === "recurring" ? "Recurring" : "Emerging"}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                {pattern.title}
              </h4>
              <p className="text-xs text-foreground-tertiary mt-0.5">
                {pattern.category}
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-foreground-muted shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-foreground-muted shrink-0" />
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3">
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">Cases</div>
            <div className="text-sm font-semibold text-foreground">{pattern.cases}</div>
          </div>
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">Signals</div>
            <div className="text-sm font-semibold text-foreground">{pattern.signals}</div>
          </div>
          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">Confidence</div>
            <div className="text-sm font-semibold text-ai-600">{pattern.confidence}%</div>
          </div>
        </div>

        {/* Affected services */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {pattern.affectedServices.map((service) => (
            <span
              key={service}
              className="text-[10px] font-mono px-2 py-0.5 bg-surface-secondary border border-border rounded text-foreground-secondary"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs text-foreground-secondary leading-relaxed mt-3">
          {pattern.description}
        </p>
      </button>
    </div>
  );
}
