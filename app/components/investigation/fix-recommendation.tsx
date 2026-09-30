import { Wrench } from "lucide-react";

const beforeCode = `const session = getSession();
validateSession(session);`;

const afterCode = `const session = await refreshSessionIfNeeded();

if (!session) {
  redirectToLogin();
  return;
}

validateSession(session);`;

export default function FixRecommendation() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-primary-50 flex items-center justify-center">
          <Wrench className="w-3.5 h-3.5 text-primary-600" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Recommended Fix</h3>
      </div>

      {/* Explanation */}
      <p className="text-sm text-foreground leading-relaxed mb-4">
        Introduce token refresh handling before session validation and
        gracefully redirect users when refresh fails.
      </p>

      {/* Code comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Before */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-critical-600 mb-2">
            Before
          </div>
          <div className="bg-surface-secondary border border-border rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs font-mono text-foreground-secondary whitespace-pre">
              {beforeCode}
            </pre>
          </div>
        </div>

        {/* After */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-resolved-600 mb-2">
            After
          </div>
          <div className="bg-surface-secondary border border-border rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs font-mono text-foreground-secondary whitespace-pre">
              {afterCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-foreground-tertiary leading-relaxed">
        Refresh the session before validation and handle expired sessions
        explicitly.
      </p>
    </div>
  );
}
