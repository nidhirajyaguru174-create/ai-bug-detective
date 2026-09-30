import { Check } from "lucide-react";

interface Stage {
  name: string;
  status: "completed" | "current" | "pending";
}

interface InvestigationProgressProps {
  stages: Stage[];
  progress: number;
}

export default function InvestigationProgress({
  stages,
  progress,
}: InvestigationProgressProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Investigation Progress
        </h3>
        <span className="text-sm font-semibold text-primary-600">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-tertiary rounded-full mb-4">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stages */}
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  stage.status === "completed"
                    ? "bg-primary-500"
                    : stage.status === "current"
                      ? "bg-ai-500"
                      : "bg-surface-tertiary border border-border"
                }`}
              >
                {stage.status === "completed" && (
                  <Check className="w-3 h-3 text-white" />
                )}
                {stage.status === "current" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1.5 font-medium ${
                  stage.status === "completed"
                    ? "text-primary-600"
                    : stage.status === "current"
                      ? "text-ai-600"
                      : "text-foreground-muted"
                }`}
              >
                {stage.name}
              </span>
            </div>
            {index < stages.length - 1 && (
              <div
                className={`w-8 h-px mx-1 mb-4 ${
                  stage.status === "completed" ? "bg-primary-500" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
