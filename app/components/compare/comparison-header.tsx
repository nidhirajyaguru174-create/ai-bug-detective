export default function ComparisonHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
          Fix Comparison Lab
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Compare the Fix
        </h2>
        <p className="mt-1 text-sm text-foreground-secondary max-w-xl">
          Inspect the proposed change, affected execution path, and verification
          evidence before accepting a fix.
        </p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
        <span className="text-xs font-mono font-medium text-foreground">
          CASE #0042
        </span>
        <span className="text-xs text-foreground-tertiary">
          Fix Status:{" "}
          <span className="text-resolved-600 font-medium">Verified</span>
        </span>
        <span className="text-xs text-foreground-tertiary">
          Confidence:{" "}
          <span className="font-mono text-foreground">94%</span>
        </span>
      </div>
    </div>
  );
}
