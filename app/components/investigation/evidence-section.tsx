import { Key, RefreshCw, AlertTriangle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Authentication: Key,
  "Session Management": RefreshCw,
  "Runtime Behavior": AlertTriangle,
};

interface EvidenceItem {
  id: number;
  title: string;
  type: string;
  description: string;
  source: string;
}

interface EvidenceSectionProps {
  evidence: EvidenceItem[];
}

export default function EvidenceSection({ evidence }: EvidenceSectionProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Evidence Found</h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Signals discovered during investigation.
        </p>
      </div>

      <div className="space-y-3">
        {evidence.map((item) => {
          const Icon = iconMap[item.type] || AlertTriangle;
          return (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-lg p-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-medium text-amber-600">
                      EVIDENCE {String(item.id).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-foreground-muted">·</span>
                    <span className="text-[10px] text-foreground-tertiary">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-foreground-muted mt-2">
                    Source: <span className="font-mono">{item.source}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
