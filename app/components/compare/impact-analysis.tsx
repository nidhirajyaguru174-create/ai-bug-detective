import { impactCards } from "@/app/data/compare-data";

export default function ImpactAnalysis() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs mb-6">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Impact Analysis
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {impactCards.map((card) => (
            <div
              key={card.label}
              className="bg-surface-secondary rounded-lg p-3"
            >
              <div className="text-[10px] font-medium uppercase tracking-wider text-foreground-tertiary mb-1">
                {card.label}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-resolved-50 border border-resolved-200 rounded-lg p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-resolved-700 mb-1">
            Expected Result
          </div>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            Dashboard requests continue successfully after session expiry when
            refresh succeeds.
          </p>
        </div>
      </div>
    </div>
  );
}
