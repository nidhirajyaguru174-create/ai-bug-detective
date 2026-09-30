import { SeverityItem } from "@/app/data/mock-data";

const colorMap: Record<string, { bar: string; text: string }> = {
  critical: { bar: "bg-critical-500", text: "text-critical-600" },
  high: { bar: "bg-high-500", text: "text-high-600" },
  medium: { bar: "bg-medium-500", text: "text-medium-600" },
  low: { bar: "bg-info-500", text: "text-info-600" },
};

interface SeverityOverviewProps {
  data: SeverityItem[];
}

export default function SeverityOverview({ data }: SeverityOverviewProps) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Severity Overview</h3>
      </div>

      <div className="space-y-3">
        {data.map((item) => {
          const colors = colorMap[item.color];
          const widthPercent = (item.count / maxCount) * 100;

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground-secondary">{item.label}</span>
                <span className={`text-xs font-medium ${colors.text}`}>{item.count}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-tertiary rounded-full">
                <div
                  className={`h-full ${colors.bar} rounded-full`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
