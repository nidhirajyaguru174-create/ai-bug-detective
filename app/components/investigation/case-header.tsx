import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

interface CaseHeaderProps {
  caseId: string;
  title: string;
  project: string;
  severity: string;
  status: string;
  location: string;
}

export default function CaseHeader({
  caseId,
  title,
  project,
  severity,
  status,
  location,
}: CaseHeaderProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left: Case info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-medium text-foreground-muted">
              CASE {caseId}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-critical-500" />
            <span className="text-xs font-medium text-critical-600">
              {severity}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {title}
          </h2>
          <p className="text-sm text-foreground-secondary">{project}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-foreground-tertiary">
              Status:{" "}
              <span className="text-foreground font-medium">{status}</span>
            </span>
            <span className="text-xs text-foreground-tertiary">
              Location:{" "}
              <span className="font-mono text-foreground">{location}</span>
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/investigate"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Investigate
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
