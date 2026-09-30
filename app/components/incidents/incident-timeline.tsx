import { incidentTimeline } from "@/app/data/incident-data";

const typeConfig = {
  critical: "bg-critical-500",
  ai: "bg-ai-500",
  investigation: "bg-amber-500",
  completed: "bg-primary-500",
};

export default function IncidentTimeline() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Incident Timeline
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Chronological signal and investigation events.
        </p>
      </div>

      <div className="space-y-0">
        {incidentTimeline.map((entry, index) => {
          const isLast = index === incidentTimeline.length - 1;
          return (
            <div key={index} className="flex gap-3">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full ${typeConfig[entry.type]} shrink-0 mt-1`} />
                {!isLast && <div className="w-px flex-1 bg-border my-1" />}
              </div>

              {/* Content */}
              <div className={`flex-1 ${!isLast ? "pb-4" : ""}`}>
                <span className="text-[10px] font-mono font-medium text-foreground-muted">
                  {entry.time}
                </span>
                <div className="text-xs font-medium text-foreground mt-0.5">
                  {entry.title}
                </div>
                <div className="text-xs text-foreground-tertiary mt-0.5 leading-relaxed">
                  {entry.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
