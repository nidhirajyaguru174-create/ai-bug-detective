import { Check, AlertTriangle, Wrench } from "lucide-react";
import { ReplayStep } from "@/app/data/replay-data";

const statusConfig = {
  normal: { dot: "bg-foreground-muted", text: "text-foreground-tertiary" },
  failure: { dot: "bg-critical-500", text: "text-critical-600" },
  fix: { dot: "bg-amber-500", text: "text-amber-600" },
  success: { dot: "bg-resolved-500", text: "text-resolved-600" },
};

interface ReplayTimelineProps {
  steps: ReplayStep[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function ReplayTimeline({
  steps,
  currentStep,
  onStepClick,
}: ReplayTimelineProps) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Execution Timeline
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Click any step to inspect the event.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-0">
          {steps.map((step, index) => {
            const isCurrent = step.id === currentStep;
            const isPast = step.id < currentStep;
            const isLast = index === steps.length - 1;
            const config = statusConfig[step.statusType];

            return (
              <div key={step.id} className="flex gap-4">
                {/* Timeline line + indicator */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onStepClick(step.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 ${
                      isCurrent
                        ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-surface"
                        : ""
                    } ${
                      step.statusType === "failure"
                        ? "bg-critical-100 border border-critical-200"
                        : step.statusType === "fix"
                          ? "bg-amber-100 border border-amber-200"
                          : step.statusType === "success"
                            ? "bg-resolved-100 border border-resolved-200"
                            : isPast
                              ? "bg-primary-100 border border-primary-200"
                              : "bg-surface-secondary border border-border"
                    }`}
                    aria-label={`Step ${step.id}: ${step.component}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isPast && step.statusType === "normal" && (
                      <Check className="w-3.5 h-3.5 text-primary-600" />
                    )}
                    {step.statusType === "failure" && (
                      <AlertTriangle className="w-3.5 h-3.5 text-critical-600" />
                    )}
                    {step.statusType === "fix" && (
                      <Wrench className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {step.statusType === "success" && (
                      <Check className="w-3.5 h-3.5 text-resolved-600" />
                    )}
                    {step.statusType === "normal" && !isPast && (
                      <span className="text-[10px] font-mono font-medium text-foreground-secondary">
                        {step.id}
                      </span>
                    )}
                  </button>
                  {!isLast && <div className="w-px flex-1 bg-border my-1" />}
                </div>

                {/* Content */}
                <button
                  onClick={() => onStepClick(step.id)}
                  className={`flex-1 text-left ${!isLast ? "pb-5" : ""}`}
                >
                  <div
                    className={`rounded-lg p-3 transition-colors duration-150 ${
                      isCurrent
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-surface-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium text-foreground-muted">
                          {String(step.id).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {step.component}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-foreground-tertiary">
                        {step.timestamp}
                      </span>
                    </div>
                    <div className="text-xs text-foreground-secondary mt-1">
                      {step.event}
                    </div>
                    {step.technicalValue && (
                      <div className="text-[11px] font-mono text-foreground-tertiary mt-1">
                        {step.technicalValue}
                      </div>
                    )}
                    <div className={`text-[10px] font-medium mt-1.5 ${config.text}`}>
                      {step.status}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
