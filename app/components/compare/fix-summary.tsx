export default function FixSummary() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs mb-6">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-3">
        Fix Summary
      </div>
      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Issue</dt>
          <dd className="text-xs font-medium text-foreground">
            Authentication Failure
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Root Cause</dt>
          <dd className="text-xs text-foreground text-right max-w-[60%]">
            Expired session token reaches validation without refresh.
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">
            Recommended Change
          </dt>
          <dd className="text-xs text-foreground text-right max-w-[60%]">
            Refresh the session before calling validateSession().
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Impact</dt>
          <dd className="text-xs text-foreground">Dashboard authentication flow</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Risk</dt>
          <dd className="text-xs font-medium text-resolved-600">Low</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-secondary">Verification</dt>
          <dd className="text-xs font-mono font-medium text-resolved-600">
            5/5 checks passed
          </dd>
        </div>
      </dl>
    </div>
  );
}
