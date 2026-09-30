import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { responseStages } from "@/app/data/incident-data";

export default function IncidentResponse() {
  const completedCount = responseStages.filter((s) => s.status === "completed").length;
  const progress = (completedCount / responseStages.length) * 100;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Response Status
        </h3>
      </div>

      {/* Phase + Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-foreground-secondary">
          Current phase: <span className="text-foreground font-medium">Investigation</span>
        </span>
        <span className="text-xs font-mono text-foreground">68%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-tertiary rounded-full mb-4">
        <div
          className="h-full bg-primary-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stages */}
      <div className="space-y-2 mb-4">
        {responseStages.map((stage) => (
          <div key={stage.name} className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center shrink-0">
              {stage.status === "completed" && (
                <Check className="w-3.5 h-3.5 text-primary-600" />
              )}
              {stage.status === "current" && (
                <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
              )}
              {stage.status === "pending" && (
                <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
              )}
            </div>
            <span
              className={`text-xs ${
                stage.status === "current"
                  ? "text-foreground font-medium"
                  : stage.status === "completed"
                    ? "text-foreground-secondary"
                    : "text-foreground-muted"
              }`}
            >
              {stage.name}
            </span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Link
          href="/investigate/case-0042"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150"
        >
          Open Investigation
        </Link>
        <Link
          href="/cases"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150"
        >
          View Related Cases
        </Link>
      </div>
    </div>
  );
}
