"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { hypotheses } from "@/app/data/ai-console-data";

const statusConfig = {
  supported: { bg: "bg-resolved-50", text: "text-resolved-700", border: "border-resolved-200" },
  weak: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  unlikely: { bg: "bg-surface-secondary", text: "text-foreground-tertiary", border: "border-border" },
};

export default function HypothesisPanel() {
  const [expandedHypothesis, setExpandedHypothesis] = useState<string | null>("1");

  const toggleHypothesis = (id: string) => {
    setExpandedHypothesis((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-600" />
          <h3 className="text-sm font-semibold text-foreground">
            Hypothesis Analysis
          </h3>
        </div>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Mock AI reasoning — simulated investigation data.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {hypotheses.map((hypothesis) => {
          const isExpanded = expandedHypothesis === hypothesis.id;
          const config = statusConfig[hypothesis.status];

          return (
            <div
              key={hypothesis.id}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleHypothesis(hypothesis.id)}
                className="w-full text-left p-4 hover:bg-surface-secondary/50 transition-colors duration-150"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                          hypothesis.type === "primary"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-surface-secondary text-foreground-tertiary border-border"
                        }`}
                      >
                        {hypothesis.type === "primary" ? "PRIMARY" : "ALTERNATIVE"}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${config.bg} ${config.text} ${config.border}`}
                      >
                        {hypothesis.status === "supported"
                          ? "Supported"
                          : hypothesis.status === "weak"
                            ? "Weak"
                            : "Unlikely"}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground">
                      {hypothesis.title}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-foreground-muted shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-foreground-muted shrink-0" />
                  )}
                </div>

                {/* Confidence bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                      Confidence
                    </span>
                    <span className="text-xs font-mono font-medium text-foreground">
                      {hypothesis.confidence}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-tertiary rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        hypothesis.status === "supported"
                          ? "bg-resolved-500"
                          : hypothesis.status === "weak"
                            ? "bg-amber-500"
                            : "bg-foreground-muted"
                      }`}
                      style={{ width: `${hypothesis.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[11px] text-foreground-tertiary">
                    Evidence:{" "}
                    <span className="font-mono text-foreground">
                      {hypothesis.evidence}
                    </span>
                  </span>
                  <span className="text-[11px] text-foreground-tertiary">
                    Signals:{" "}
                    <span className="font-mono text-foreground">
                      {hypothesis.signals}
                    </span>
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-border bg-surface-secondary/30">
                  <p className="text-xs text-foreground-secondary leading-relaxed py-3">
                    {hypothesis.details}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
