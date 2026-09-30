import { beforeCode, afterCode } from "@/app/data/compare-data";

const beforeLines = beforeCode.split("\n");
const afterLines = afterCode.split("\n");

// Lines in after that are new (not in before)
const addedLineIndices = [0, 2, 3, 4, 5, 6];
// Lines that changed (validateSession moved)
const changedLineIndices = [7];

export default function CodeComparison() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs mb-6">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Code Comparison
        </h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Side-by-side comparison of the original and recommended implementation.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-critical-600">
                Before — Original Implementation
              </span>
              <span className="text-[10px] font-mono text-foreground-muted">
                {beforeLines.length} lines
              </span>
            </div>
            <div className="bg-surface-secondary border border-border rounded-lg overflow-hidden">
              <div className="p-4 font-mono text-xs overflow-x-auto">
                {beforeLines.map((line, index) => (
                  <div key={index} className="flex">
                    <span className="w-8 text-foreground-muted select-none shrink-0 text-right mr-3">
                      {index + 1}
                    </span>
                    <span className="text-foreground whitespace-pre">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[10px] text-foreground-tertiary">
                <span className="w-2 h-2 rounded-full bg-foreground-muted" />
                Unchanged
              </span>
            </div>
          </div>

          {/* After */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-resolved-600">
                After — Recommended Implementation
              </span>
              <span className="text-[10px] font-mono text-foreground-muted">
                {afterLines.length} lines
              </span>
            </div>
            <div className="bg-surface-secondary border border-border rounded-lg overflow-hidden">
              <div className="p-4 font-mono text-xs overflow-x-auto">
                {afterLines.map((line, index) => {
                  const isAdded = addedLineIndices.includes(index);
                  const isChanged = changedLineIndices.includes(index);
                  return (
                    <div key={index} className="flex">
                      <span className="w-8 text-foreground-muted select-none shrink-0 text-right mr-3">
                        {index + 1}
                      </span>
                      <span
                        className={`whitespace-pre ${
                          isAdded
                            ? "bg-resolved-50 text-resolved-700 -mx-2 px-2 rounded"
                            : isChanged
                              ? "bg-amber-50 text-amber-700 -mx-2 px-2 rounded"
                              : "text-foreground"
                        }`}
                      >
                        {line}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[10px] text-foreground-tertiary">
                <span className="w-2 h-2 rounded-full bg-resolved-500" />
                Added
              </span>
              <span className="flex items-center gap-1 text-[10px] text-foreground-tertiary">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Changed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
