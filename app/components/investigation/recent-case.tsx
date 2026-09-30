export default function RecentCase() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
          Recent Case
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-foreground-muted">#0041</div>
          <div className="text-sm font-medium text-foreground mt-0.5">
            Authentication Failure
          </div>
          <div className="text-xs text-foreground-tertiary mt-0.5">
            Root Cause Analysis
          </div>
          <div className="text-xs text-foreground-muted mt-1">
            Last investigated 18 min ago
          </div>
        </div>
        <button className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
          View case
        </button>
      </div>
    </div>
  );
}
