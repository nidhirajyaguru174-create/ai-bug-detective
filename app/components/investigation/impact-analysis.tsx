interface ImpactMetric {
  label: string;
  value: string;
}

interface ImpactAnalysisProps {
  metrics: ImpactMetric[];
  description: string;
}

export default function ImpactAnalysis({
  metrics,
  description,
}: ImpactAnalysisProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Impact Analysis</h3>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-surface-secondary rounded-lg p-3"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-foreground-tertiary mb-1">
              {metric.label}
            </div>
            <div className="text-sm font-semibold text-foreground">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-foreground-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
