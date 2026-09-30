import { Play } from "lucide-react";

export default function VerificationCard() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Verification</h3>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <span className="text-xs font-medium text-amber-600">Pending</span>
      </div>

      <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
        The proposed fix has not been executed against the project yet.
      </p>

      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150">
        <Play className="w-4 h-4" />
        Run Verification
      </button>
    </div>
  );
}
