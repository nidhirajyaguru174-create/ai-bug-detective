"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import { nextInspections } from "@/app/data/ai-console-data";

export default function NextInspection() {
  const [queued, setQueued] = useState<Set<number>>(new Set());

  const handleInspect = (index: number) => {
    setQueued((prev) => new Set(prev).add(index));
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Recommended Next Inspection
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Services to inspect based on investigation findings.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {nextInspections.map((item, index) => {
          const isQueued = queued.has(index);
          return (
            <div
              key={item.service}
              className="flex items-center justify-between gap-3 border border-border rounded-lg p-3"
            >
              <div className="min-w-0">
                <div className="text-xs font-mono font-medium text-foreground">
                  {item.service}
                </div>
                <div className="text-[11px] text-foreground-tertiary mt-0.5">
                  {item.reason}
                </div>
              </div>
              <button
                onClick={() => handleInspect(index)}
                disabled={isQueued}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 shrink-0 ${
                  isQueued
                    ? "bg-resolved-50 text-resolved-700 border border-resolved-200"
                    : "text-primary-600 bg-primary-50 border border-primary-200 hover:bg-primary-100"
                }`}
              >
                {isQueued ? (
                  <>
                    <Check className="w-3 h-3" />
                    Queued
                  </>
                ) : (
                  <>
                    <Search className="w-3 h-3" />
                    Inspect
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
