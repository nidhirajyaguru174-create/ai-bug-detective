"use client";

import { Paperclip } from "lucide-react";
import { InvestigationType } from "./investigation-type-selector";

interface EvidenceInputProps {
  value: string;
  onChange: (value: string) => void;
  type: InvestigationType;
}

const placeholders: Record<InvestigationType, string> = {
  code: "Paste the code you want the detective to investigate...",
  error: "Paste the error message or stack trace...",
  description:
    "Describe what went wrong, what you expected, and what actually happened...",
};

export default function EvidenceInput({
  value,
  onChange,
  type,
}: EvidenceInputProps) {
  const isMonospace = type === "code" || type === "error";

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-secondary border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
          Evidence Input
        </span>
        <span className="text-xs text-foreground-muted">Ready for analysis</span>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[type]}
        className={`w-full h-48 p-4 bg-surface text-foreground placeholder:text-foreground-muted resize-none focus:outline-none ${
          isMonospace ? "font-mono text-sm" : "text-sm"
        }`}
        aria-label="Evidence input"
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-secondary border-t border-border">
        <span className="text-xs text-foreground-muted">
          {value.length} characters
        </span>
        <button
          onClick={() => onChange("")}
          className="text-xs text-foreground-tertiary hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Attachment area */}
      <div className="px-4 py-3 bg-surface border-t border-border">
        <div className="flex items-center justify-center gap-2 py-3 border border-dashed border-border-strong rounded-lg hover:border-primary-400 hover:bg-primary-50/30 transition-colors cursor-pointer">
          <Paperclip className="w-4 h-4 text-foreground-muted" />
          <span className="text-xs text-foreground-secondary">
            Drop files here or browse
          </span>
        </div>
        <p className="text-[11px] text-foreground-muted text-center mt-2">
          JS, TS, JSX, TSX, PY, JAVA, LOG and TXT
        </p>
      </div>
    </div>
  );
}
