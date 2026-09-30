import { Sparkles, ArrowRight } from "lucide-react";
import { patternDetail } from "@/app/data/pattern-data";

export default function PatternDetail() {
  return (
    <div className="border-t border-border bg-surface-secondary/30 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-ai-50 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-ai-600" />
        </div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
          {patternDetail.title}
        </h4>
        <span className="text-[10px] font-mono text-ai-600 ml-auto">
          AI confidence: {patternDetail.confidence}%
        </span>
      </div>

      {/* Connected Cases */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Connected Cases
        </div>
        <div className="space-y-1.5">
          {patternDetail.connectedCases.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between bg-surface border border-border rounded px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-foreground-muted">
                  {c.id}
                </span>
                <span className="text-xs text-foreground">{c.title}</span>
              </div>
              <span className="text-[10px] text-foreground-tertiary">
                {c.project}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Signals */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Common Signals
        </div>
        <div className="space-y-1">
          {patternDetail.commonSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs text-foreground-secondary">{signal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Failure Path */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
          Common Failure Path
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {patternDetail.failurePath.map((step, index) => (
            <div key={step} className="flex items-center gap-1">
              <span
                className={`text-[10px] font-mono px-2 py-1 rounded border ${
                  step === "401" || step === "Request Failure"
                    ? "bg-critical-50 border-critical-200 text-critical-700"
                    : step === "Expired Session"
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-surface border-border text-foreground-secondary"
                }`}
              >
                {step}
              </span>
              {index < patternDetail.failurePath.length - 1 && (
                <ArrowRight className="w-3 h-3 text-foreground-muted" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Interpretation */}
      <div className="bg-ai-50 border border-ai-200 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3 h-3 text-ai-600" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ai-700">
            AI Interpretation
          </span>
        </div>
        <p className="text-xs text-foreground-secondary leading-relaxed">
          {patternDetail.interpretation}
        </p>
      </div>
    </div>
  );
}
