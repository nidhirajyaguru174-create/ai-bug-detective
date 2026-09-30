import { Sparkles } from "lucide-react";

interface RootCauseCardProps {
  description: string;
  confidence: number;
  category: string;
  steps: string[];
}

export default function RootCauseCard({
  description,
  confidence,
  category,
  steps,
}: RootCauseCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-ai-50 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-ai-600" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Root Cause</h3>
        <span className="text-[10px] font-medium text-ai-600 bg-ai-50 px-2 py-0.5 rounded-full">
          AI Analysis
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Confidence + Category */}
      <div className="flex items-center gap-6 mb-4 pb-4 border-b border-border">
        <div>
          <div className="text-xs text-foreground-tertiary mb-0.5">
            Confidence
          </div>
          <div className="text-lg font-semibold text-ai-600">{confidence}%</div>
        </div>
        <div>
          <div className="text-xs text-foreground-tertiary mb-0.5">
            Cause Category
          </div>
          <div className="text-sm font-medium text-foreground">{category}</div>
        </div>
      </div>

      {/* Why it happens */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary mb-3">
          Why it happens
        </div>
        <ol className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-surface-secondary border border-border flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-medium text-foreground-secondary">
                  {index + 1}
                </span>
              </span>
              <span className="text-xs text-foreground-secondary leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
