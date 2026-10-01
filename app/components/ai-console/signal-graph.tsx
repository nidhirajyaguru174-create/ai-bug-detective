import { signalGraphNodes } from "@/app/data/ai-console-data";

export default function SignalGraph() {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Signal Graph</h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Relationship map of connected signals.
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center">
          {/* Center node */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg px-5 py-2.5 text-center shadow-xs max-w-full">
            <span className="text-sm font-semibold text-foreground">
              Authentication Failure
            </span>
          </div>

          {/* Vertical line */}
          <div className="w-px h-6 bg-border" />

          {/* Connected nodes grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {signalGraphNodes.map((node) => (
              <div
                key={node.id}
                className="flex flex-col items-center"
              >
                <div className="w-px h-4 bg-border" />
                <div className="bg-surface border border-border rounded px-3 py-1.5 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-colors cursor-pointer shadow-xs w-full">
                  <span className="text-[11px] font-mono text-foreground break-words">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
