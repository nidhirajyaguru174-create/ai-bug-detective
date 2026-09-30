import { Check } from "lucide-react";
import { replayHistory } from "@/app/data/replay-data";

export default function ReplayHistory() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Replay History
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Investigation lifecycle for Case #0042.
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {replayHistory.map((item, index) => {
            const isLast = index === replayHistory.length - 1;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.status === "Verified"
                        ? "bg-resolved-100 border border-resolved-200"
                        : "bg-primary-100 border border-primary-200"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 ${
                        item.status === "Verified"
                          ? "text-resolved-600"
                          : "text-primary-600"
                      }`}
                    />
                  </div>
                  <div className="text-[10px] font-medium text-foreground mt-1 text-center max-w-[80px]">
                    {item.label}
                  </div>
                  <div className="text-[10px] font-mono text-foreground-tertiary">
                    {item.time}
                  </div>
                </div>
                {!isLast && (
                  <div className="hidden sm:block w-8 h-px bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
