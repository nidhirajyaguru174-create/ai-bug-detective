import { Sparkles } from "lucide-react";
import { replayInsight } from "@/app/data/replay-data";

export default function ReplayInsight() {
  return (
    <div className="bg-ai-50 border border-ai-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-ai-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-ai-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-semibold text-ai-700 uppercase tracking-wider mb-1">
            {replayInsight.title}
          </h4>
          <p className="text-xs text-foreground-secondary leading-relaxed mb-3">
            {replayInsight.text}
          </p>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Evidence Chain
              </div>
              <div className="text-xs font-mono font-medium text-ai-600">
                {replayInsight.evidenceChain} signals
              </div>
            </div>
            <div>
              <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Root Cause Confidence
              </div>
              <div className="text-xs font-mono font-medium text-ai-600">
                {replayInsight.rootCauseConfidence}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                Pattern Match
              </div>
              <div className="text-xs font-mono font-medium text-ai-600">
                {replayInsight.patternMatch}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
