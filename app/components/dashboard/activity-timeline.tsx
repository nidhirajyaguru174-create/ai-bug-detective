import { Search, FileSearch, TrendingUp, Wrench, LucideIcon } from "lucide-react";
import { ActivityItem } from "@/app/data/mock-data";

const typeConfig: Record<string, { icon: LucideIcon; color: string }> = {
  "root-cause": { icon: Search, color: "text-ai-600" },
  evidence: { icon: FileSearch, color: "text-ai-600" },
  pattern: { icon: TrendingUp, color: "text-ai-600" },
  fix: { icon: Wrench, color: "text-ai-600" },
};

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">AI Investigation Activity</h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Recent discoveries from the AI investigation engine.
        </p>
      </div>

      <div className="space-y-0">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={activity.id} className="flex gap-3">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-ai-50 flex items-center justify-center shrink-0">
                  <Icon className={`w-3 h-3 ${config.color}`} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-border my-1" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${!isLast ? "pb-4" : ""}`}>
                <div className="text-xs font-medium text-foreground">{activity.title}</div>
                <div className="text-xs text-foreground-tertiary mt-0.5 leading-relaxed">
                  {activity.description}
                </div>
                <div className="text-[11px] text-foreground-muted mt-1">{activity.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
