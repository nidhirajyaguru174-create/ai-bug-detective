interface CaseContextProps {
  caseNumber: string;
  status: string;
  evidence: string;
  analysis: string;
  focus: string[];
}

export default function CaseContext({
  caseNumber,
  status,
  evidence,
  analysis,
  focus,
}: CaseContextProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground">Case Context</h3>
      </div>

      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-tertiary">Case</dt>
          <dd className="text-xs font-mono text-foreground">{caseNumber}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-tertiary">Status</dt>
          <dd className="text-xs text-foreground">{status}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-tertiary">Evidence</dt>
          <dd className="text-xs text-foreground">{evidence}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-tertiary">Analysis</dt>
          <dd className="text-xs text-foreground">{analysis}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-xs text-foreground-tertiary">Focus</dt>
          <dd className="text-xs text-foreground">
            {focus.join(", ") || "None"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
