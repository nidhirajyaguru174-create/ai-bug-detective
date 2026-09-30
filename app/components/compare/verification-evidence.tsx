import { verificationChecks } from "@/app/data/compare-data";

export default function VerificationEvidence() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs mb-6">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Verification Evidence
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Before and after verification results.
        </p>
      </div>

      <div className="p-6">
        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-secondary border-b border-border">
                <th className="text-left px-4 py-2.5 font-medium text-foreground-secondary">
                  Check
                </th>
                <th className="text-center px-4 py-2.5 font-medium text-foreground-secondary">
                  Before
                </th>
                <th className="text-center px-4 py-2.5 font-medium text-foreground-secondary">
                  After
                </th>
              </tr>
            </thead>
            <tbody>
              {verificationChecks.map((item) => (
                <tr
                  key={item.check}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2.5 text-foreground">{item.check}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-critical-50 text-critical-700 font-mono font-medium">
                      {item.before}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-resolved-50 text-resolved-700 font-mono font-medium">
                      {item.after}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between bg-resolved-50 border border-resolved-200 rounded-lg p-3">
          <span className="text-xs font-medium text-foreground">
            Summary
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-resolved-600">
              5 / 5 checks passed
            </span>
            <span className="text-xs font-semibold text-resolved-600 uppercase tracking-wider">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
