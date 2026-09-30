"use client";

import { Code, AlertTriangle, FileText } from "lucide-react";

export type InvestigationType = "code" | "error" | "description";

interface InvestigationTypeSelectorProps {
  value: InvestigationType;
  onChange: (type: InvestigationType) => void;
}

const types = [
  { id: "code" as const, label: "Code", icon: Code },
  { id: "error" as const, label: "Error / Stack Trace", icon: AlertTriangle },
  { id: "description" as const, label: "Bug Description", icon: FileText },
];

export default function InvestigationTypeSelector({
  value,
  onChange,
}: InvestigationTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-surface-secondary rounded-lg border border-border">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onChange(type.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
            value === type.id
              ? "bg-primary-600 text-white"
              : "text-foreground-secondary hover:text-foreground hover:bg-surface-tertiary"
          }`}
          aria-pressed={value === type.id}
        >
          <type.icon className="w-4 h-4" />
          {type.label}
        </button>
      ))}
    </div>
  );
}
