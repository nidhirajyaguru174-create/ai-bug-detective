const steps = [
  {
    number: "01",
    title: "Evidence Scan",
    description: "Inspect supplied code, errors, and context",
  },
  {
    number: "02",
    title: "Execution Path",
    description: "Trace the likely path leading to the failure",
  },
  {
    number: "03",
    title: "Root Cause",
    description: "Identify the most probable underlying cause",
  },
  {
    number: "04",
    title: "Impact Analysis",
    description: "Determine affected components and severity",
  },
  {
    number: "05",
    title: "Fix Strategy",
    description: "Generate and explain a potential solution",
  },
];

export default function InvestigationBrief() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Investigation Brief
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          How the detective will approach this case.
        </p>
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.number} className="flex gap-3">
            {/* Number marker + connector */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-semibold text-primary-700">
                  {step.number}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-px flex-1 bg-border my-1" />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${index < steps.length - 1 ? "pb-4" : ""}`}>
              <div className="text-xs font-medium text-foreground">
                {step.title}
              </div>
              <div className="text-xs text-foreground-tertiary mt-0.5 leading-relaxed">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
