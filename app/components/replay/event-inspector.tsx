import { eventInspectorData } from "@/app/data/replay-data";

export default function EventInspector() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Event Inspector
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Details for the selected event.
        </p>
      </div>

      <div className="p-6">
        <dl className="space-y-3">
          <div className="flex items-center justify-between">
            <dt className="text-xs text-foreground-tertiary">Event</dt>
            <dd className="text-xs font-mono text-foreground">
              {eventInspectorData.event}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-xs text-foreground-tertiary">Component</dt>
            <dd className="text-xs font-mono text-foreground">
              {eventInspectorData.component}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-xs text-foreground-tertiary">Input</dt>
            <dd className="text-xs text-foreground">
              {eventInspectorData.input}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-xs text-foreground-tertiary">Output</dt>
            <dd className="text-xs font-mono text-critical-600">
              {eventInspectorData.output}
            </dd>
          </div>
        </dl>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-2">
            Related Evidence
          </div>
          <div className="flex flex-wrap gap-1.5">
            {eventInspectorData.relatedEvidence.map((evidence) => (
              <span
                key={evidence}
                className="text-[10px] font-mono px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-amber-700"
              >
                {evidence}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-tertiary">
              Related Pattern
            </span>
            <span className="text-xs font-mono text-foreground">
              {eventInspectorData.relatedPattern}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-tertiary">
              AI Confidence
            </span>
            <span className="text-xs font-mono font-medium text-ai-600">
              {eventInspectorData.aiConfidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
