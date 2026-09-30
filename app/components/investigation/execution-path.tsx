import { ArrowDown, AlertTriangle } from "lucide-react";

interface PathNode {
  label: string;
  status: "normal" | "failure";
}

interface ExecutionPathProps {
  nodes: PathNode[];
}

export default function ExecutionPath({ nodes }: ExecutionPathProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Execution Path</h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Request flow leading to the failure.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {nodes.map((node, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`px-4 py-2 rounded-lg border text-xs font-mono font-medium ${
                node.status === "failure"
                  ? "bg-critical-50 border-critical-200 text-critical-700"
                  : "bg-surface-secondary border-border text-foreground-secondary"
              }`}
            >
              {node.label}
            </div>
            {index < nodes.length - 1 && (
              <div className="py-1">
                {node.status === "failure" ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-critical-500" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-foreground-muted" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
