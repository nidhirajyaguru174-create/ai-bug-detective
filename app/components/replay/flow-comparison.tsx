import { ArrowDown, AlertTriangle, Check } from "lucide-react";
import { originalFlow, recoveredFlow } from "@/app/data/replay-data";

export default function FlowComparison() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Before vs After
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Compare the original failure with the verified recovery flow.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Flow */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-critical-600 mb-3">
              Original Flow
            </div>
            <div className="flex flex-col items-center">
              {originalFlow.map((step, index) => {
                const isFailure =
                  step === "Expired Token" ||
                  step === "401 Unauthorized" ||
                  step === "Request Failed";
                return (
                  <div key={step} className="flex flex-col items-center w-full">
                    <div
                      className={`w-full px-3 py-2 rounded border text-center text-xs font-mono ${
                        isFailure
                          ? "bg-critical-50 border-critical-200 text-critical-700"
                          : "bg-surface-secondary border-border text-foreground-secondary"
                      }`}
                    >
                      {step}
                    </div>
                    {index < originalFlow.length - 1 && (
                      <div className="py-0.5">
                        {isFailure ? (
                          <AlertTriangle className="w-3 h-3 text-critical-500" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-foreground-muted" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recovered Flow */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-resolved-600 mb-3">
              Verified Recovery Flow
            </div>
            <div className="flex flex-col items-center">
              {recoveredFlow.map((step, index) => {
                const isSuccess =
                  step === "Refresh Session" ||
                  step === "New Token" ||
                  step === "Dashboard Success";
                return (
                  <div key={step} className="flex flex-col items-center w-full">
                    <div
                      className={`w-full px-3 py-2 rounded border text-center text-xs font-mono ${
                        isSuccess
                          ? "bg-resolved-50 border-resolved-200 text-resolved-700"
                          : "bg-surface-secondary border-border text-foreground-secondary"
                      }`}
                    >
                      {step}
                    </div>
                    {index < recoveredFlow.length - 1 && (
                      <div className="py-0.5">
                        {isSuccess ? (
                          <Check className="w-3 h-3 text-resolved-500" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-foreground-muted" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
