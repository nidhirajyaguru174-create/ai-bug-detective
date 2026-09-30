import { changePoints } from "@/app/data/compare-data";

export default function ChangeExplanation() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Why this change?
      </h3>
      <p className="text-sm text-foreground leading-relaxed mb-4">
        The original flow validates the existing session immediately. The
        proposed flow first checks whether the session requires refresh, obtains
        a valid session when possible, and prevents invalid authentication state
        from reaching validation.
      </p>

      <div className="space-y-2">
        {changePoints.map((point, index) => (
          <div key={point} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-medium text-primary-700">
                {index + 1}
              </span>
            </span>
            <span className="text-xs text-foreground-secondary">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
