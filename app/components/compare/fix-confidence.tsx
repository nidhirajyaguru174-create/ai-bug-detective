import { Sparkles } from "lucide-react";
import { fixConfidence } from "@/app/data/compare-data";

export default function FixConfidence() {
  return (
    <div className="bg-ai-50 border border-ai-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-ai-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-ai-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            AI Recommendation Confidence
          </h4>

          {/* Confidence bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Confidence
              </span>
              <span className="text-sm font-mono font-medium text-ai-600">
                {fixConfidence.confidence}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-tertiary rounded-full">
              <div
                className="h-full bg-ai-500 rounded-full"
                style={{ width: `${fixConfidence.confidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Supporting Evidence
              </div>
              <div className="text-sm font-mono font-medium text-foreground">
                {fixConfidence.supportingEvidence} signals
              </div>
            </div>
            <div>
              <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Related Pattern
              </div>
              <div className="text-sm font-mono font-medium text-foreground">
                {fixConfidence.relatedPattern}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider mb-1.5">
              Related Cases
            </div>
            <div className="flex flex-wrap gap-1.5">
              {fixConfidence.relatedCases.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-mono px-2 py-0.5 bg-surface border border-border rounded text-foreground-secondary"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-foreground-muted mt-3">
            Simulated/mock investigation data.
          </p>
        </div>
      </div>
    </div>
  );
}
