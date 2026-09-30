import { AlertTriangle } from "lucide-react";
import { failurePoint } from "@/app/data/replay-data";

export default function FailurePoint() {
  return (
    <div className="bg-critical-50 border border-critical-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-critical-600" />
        <span className="text-xs font-semibold text-critical-700 uppercase tracking-wider">
          {failurePoint.title}
        </span>
      </div>

      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Function</dt>
          <dd className="text-xs font-mono text-foreground">
            {failurePoint.function}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Signal</dt>
          <dd className="text-xs text-foreground">{failurePoint.signal}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Response</dt>
          <dd className="text-xs font-mono text-critical-600">
            {failurePoint.response}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Severity</dt>
          <dd className="text-xs font-medium text-critical-600">
            {failurePoint.severity}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Confidence</dt>
          <dd className="text-xs font-mono text-foreground">
            {failurePoint.confidence}%
          </dd>
        </div>
      </dl>
    </div>
  );
}
