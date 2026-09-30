import { weeklyActivity } from "@/app/data/pattern-data";

export default function PatternActivity() {
  const maxCount = Math.max(...weeklyActivity.map((w) => w.count));

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Pattern Activity
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Mock weekly activity across investigation cycles.
        </p>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-3 h-32 mb-3">
        {weeklyActivity.map((week) => {
          const heightPercent = (week.count / maxCount) * 100;
          return (
            <div key={week.week} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[10px] font-mono text-foreground mb-1">
                {week.count}
              </span>
              <div
                className="w-full bg-primary-500 rounded-t-sm transition-all duration-300"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Week labels */}
      <div className="flex gap-3">
        {weeklyActivity.map((week) => (
          <div key={week.week} className="flex-1 text-center">
            <span className="text-[10px] text-foreground-tertiary">
              {week.week}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-foreground-muted mt-3 text-center">
        Pattern activity increased over the last four investigation cycles.
      </p>
    </div>
  );
}
