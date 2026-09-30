"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Play, Loader2 } from "lucide-react";

type VerificationStatus = "idle" | "running" | "completed";

interface VerificationStep {
  label: string;
  status: "pending" | "running" | "completed";
}

const steps = [
  "Preparing verification environment",
  "Reproducing original authentication failure",
  "Applying recommended session refresh logic",
  "Re-running authentication validation",
  "Checking dashboard request recovery",
];

const summaryChecks = [
  { label: "Original failure", result: "Reproduced" },
  { label: "Recommended fix", result: "Applied" },
  { label: "Authentication validation", result: "Passed" },
  { label: "Dashboard recovery", result: "Passed" },
];

interface VerificationRunnerProps {
  onComplete?: () => void;
}

export default function VerificationRunner({ onComplete }: VerificationRunnerProps) {
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<VerificationStep[]>(
    steps.map((label) => ({ label, status: "pending" as const }))
  );
  const [elapsedTime, setElapsedTime] = useState(0);

  // Elapsed time timer
  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Step progression
  useEffect(() => {
    if (status !== "running") return;

    const timer = setTimeout(() => {
      // Mark current step as completed
      setStepStatuses((prev) =>
        prev.map((s, i) =>
          i === currentStep ? { ...s, status: "completed" as const } : s
        )
      );

      const nextStep = currentStep + 1;
      if (nextStep >= steps.length) {
        setStatus("completed");
        onComplete?.();
      } else {
        // Mark next step as running
        setStepStatuses((prev) =>
          prev.map((s, i) =>
            i === nextStep ? { ...s, status: "running" as const } : s
          )
        );
        setCurrentStep(nextStep);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [status, currentStep, onComplete]);

  const startVerification = useCallback(() => {
    // Mark first step as running
    setStepStatuses((prev) =>
      prev.map((s, i) =>
        i === 0 ? { ...s, status: "running" as const } : s
      )
    );
    setStatus("running");
    setCurrentStep(0);
    setElapsedTime(0);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Idle state
  if (status === "idle") {
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
        <button
          onClick={startVerification}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150"
        >
          <Play className="w-4 h-4" />
          Run Verification
        </button>
      </div>
    );
  }

  // Running state
  if (status === "running") {
    const progress = (currentStep / steps.length) * 100;
    return (
      <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Verification</h3>
          <span className="text-xs font-mono text-foreground-tertiary">
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-surface-tertiary rounded-full mb-4">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-2.5">
          {stepStatuses.map((step, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {step.status === "completed" && (
                  <Check className="w-3.5 h-3.5 text-primary-600" />
                )}
                {step.status === "running" && (
                  <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
                )}
                {step.status === "pending" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
                )}
              </div>
              <span
                className={`text-xs ${
                  step.status === "running"
                    ? "text-foreground font-medium"
                    : step.status === "completed"
                      ? "text-foreground-secondary"
                      : "text-foreground-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Completed state
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Verification</h3>
        <span className="text-xs font-mono text-foreground-tertiary">
          {formatTime(elapsedTime)}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-resolved-500" />
        <span className="text-xs font-semibold text-resolved-600 uppercase tracking-wider">
          Verified
        </span>
      </div>

      <h4 className="text-sm font-semibold text-foreground mb-2">
        Fix verified successfully
      </h4>
      <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
        The authentication flow now refreshes expired sessions before validation
        and gracefully handles failed refresh attempts.
      </p>

      {/* Summary checks */}
      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        {summaryChecks.map((check) => (
          <div key={check.label} className="flex items-center justify-between">
            <span className="text-xs text-foreground-secondary">{check.label}</span>
            <span className="text-xs font-medium text-resolved-600 flex items-center gap-1">
              <Check className="w-3 h-3" />
              {check.result}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-foreground-tertiary">
          5/5 checks passed
        </span>
        <span className="text-xs text-foreground-muted">Verified just now</span>
      </div>
    </div>
  );
}
