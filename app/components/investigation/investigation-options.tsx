"use client";

interface InvestigationOptionsProps {
  depth: string;
  onDepthChange: (depth: string) => void;
  focus: string[];
  onFocusChange: (focus: string[]) => void;
}

const depths = ["Quick", "Standard", "Deep"];
const focusOptions = ["Root Cause", "Security", "Performance", "Reliability"];

export default function InvestigationOptions({
  depth,
  onDepthChange,
  focus,
  onFocusChange,
}: InvestigationOptionsProps) {
  const toggleFocus = (option: string) => {
    if (focus.includes(option)) {
      onFocusChange(focus.filter((f) => f !== option));
    } else {
      onFocusChange([...focus, option]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Analysis Depth */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary block mb-2">
          Analysis Depth
        </label>
        <div className="flex gap-1">
          {depths.map((d) => (
            <button
              key={d}
              onClick={() => onDepthChange(d)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                depth === d
                  ? "bg-primary-600 text-white"
                  : "bg-surface-secondary text-foreground-secondary hover:text-foreground border border-border"
              }`}
              aria-pressed={depth === d}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Focus */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary block mb-2">
          Focus
        </label>
        <div className="flex flex-wrap gap-1">
          {focusOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleFocus(option)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                focus.includes(option)
                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                  : "bg-surface-secondary text-foreground-secondary hover:text-foreground border border-border"
              }`}
              aria-pressed={focus.includes(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
