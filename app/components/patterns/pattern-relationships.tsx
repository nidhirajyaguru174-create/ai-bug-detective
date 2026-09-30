import { ArrowDown } from "lucide-react";
import { relationships } from "@/app/data/pattern-data";

export default function PatternRelationships() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Pattern Relationships
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Connected patterns observed across investigations.
        </p>
      </div>

      <div className="space-y-3">
        {relationships.map((rel, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full bg-surface-secondary border border-border rounded-lg px-3 py-2 text-center">
              <span className="text-xs font-medium text-foreground">
                {rel.from}
              </span>
            </div>
            <div className="py-1">
              <ArrowDown className="w-3.5 h-3.5 text-foreground-muted" />
            </div>
            <div className="w-full bg-surface-secondary border border-border rounded-lg px-3 py-2 text-center">
              <span className="text-xs font-medium text-foreground">
                {rel.to}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
