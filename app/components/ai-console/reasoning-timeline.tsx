"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { timelineSteps } from "@/app/data/ai-console-data";

const statusConfig = {
  complete: { bg: "bg-primary-50", text: "text-primary-700", border: "border-primary-200" },
  primary: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  ready: { bg: "bg-ai-50", text: "text-ai-700", border: "border-ai-200" },
};

export default function ReasoningTimeline() {
  const [expandedStep, setExpandedStep] = useState<string | null>("04");

  const toggleStep = (id: string) => {
    setExpandedStep((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          AI Reasoning Timeline
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Step-by-step investigation reasoning.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-0">
          {timelineSteps.map((step, index) => {
            const isExpanded = expandedStep === step.id;
            const isLast = index === timelineSteps.length - 1;
            const config = statusConfig[step.statusType];

            return (
              <div key={step.id} className="flex gap-4">
                {/* Timeline line + number */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-semibold shrink-0 ${
                      step.statusType === "complete"
                        ? "bg-primary-500 text-white"
                        : step.statusType === "primary"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-ai-100 text-ai-700 border border-ai-200"
                    }`}
                  >
                    {step.statusType === "complete" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border my-1" />}
                </div>

                {/* Content */}
                <div className={`flex-1 ${!isLast ? "pb-5" : ""}`}>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground">
                          {step.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${config.bg} ${config.text} ${config.border}`}
                        >
                          {step.status}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-foreground-muted shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-foreground-muted shrink-0" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 pl-2 border-l-2 border-border">
                      <p className="text-xs text-foreground-secondary leading-relaxed mb-2">
                        {step.details}
                      </p>
                      {step.meta.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-center gap-2 text-[11px]"
                        >
                          <span className="text-foreground-tertiary">{m.label}:</span>
                          <span className="font-mono text-foreground">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
