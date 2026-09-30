interface TimelineEntry {
  time: string;
  title: string;
  description: string;
}

interface AITimelineProps {
  entries: TimelineEntry[];
}

export default function AITimeline({ entries }: AITimelineProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          AI Investigation Timeline
        </h3>
      </div>

      <div className="space-y-0">
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-3">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-ai-500 shrink-0 mt-1" />
              {index < entries.length - 1 && (
                <div className="w-px flex-1 bg-border my-1" />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${index < entries.length - 1 ? "pb-4" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-medium text-ai-600">
                  {entry.time}
                </span>
              </div>
              <div className="text-xs font-medium text-foreground mt-0.5">
                {entry.title}
              </div>
              <div className="text-xs text-foreground-tertiary mt-0.5 leading-relaxed">
                {entry.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
