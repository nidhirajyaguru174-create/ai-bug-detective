"use client";

import { useState, useEffect } from "react";
import { Play, Check, AlertTriangle, Wrench, Loader2 } from "lucide-react";

type LabState =
  | "ready"
  | "reproducing"
  | "bug_reproduced"
  | "applying_fix"
  | "fix_applied"
  | "verifying_fix"
  | "verified";

interface TraceStep {
  id: string;
  label: string;
  detail: string;
  type: "normal" | "failure" | "success";
}

const reproductionSteps: TraceStep[] = [
  { id: "01", label: "Request received", detail: "GET /dashboard", type: "normal" },
  { id: "02", label: "Session middleware", detail: "Session token detected", type: "normal" },
  { id: "03", label: "SessionManager", detail: "Checking session validity", type: "normal" },
  { id: "04", label: "validateSession()", detail: "Expired token detected", type: "failure" },
  { id: "05", label: "Authentication middleware", detail: "401 Unauthorized", type: "failure" },
  { id: "06", label: "Dashboard", detail: "Request failed", type: "failure" },
];

const fixedSteps: TraceStep[] = [
  { id: "01", label: "Request received", detail: "GET /dashboard", type: "normal" },
  { id: "02", label: "Session middleware", detail: "Session token detected", type: "normal" },
  { id: "03", label: "SessionManager", detail: "Session refresh triggered", type: "normal" },
  { id: "04", label: "Token refresh", detail: "New session token received", type: "normal" },
  { id: "05", label: "validateSession()", detail: "Session valid", type: "normal" },
  { id: "06", label: "Dashboard", detail: "Request completed successfully", type: "success" },
];

const fixItems = [
  "Refresh session before validation",
  "Handle failed refresh gracefully",
  "Prevent expired token from reaching validation",
];

export default function ReproductionLab() {
  const [labState, setLabState] = useState<LabState>("ready");
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTrace, setActiveTrace] = useState<"reproduction" | "fixed">("reproduction");

  // Step progression for reproduction and verification
  useEffect(() => {
    if (labState !== "reproducing" && labState !== "verifying_fix") return;

    const steps = activeTrace === "reproduction" ? reproductionSteps : fixedSteps;

    const timer = setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep >= steps.length) {
        if (labState === "reproducing") {
          setLabState("bug_reproduced");
        } else if (labState === "verifying_fix") {
          setLabState("verified");
        }
      } else {
        setCurrentStep(nextStep);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [labState, currentStep, activeTrace]);

  // Fix application
  useEffect(() => {
    if (labState !== "applying_fix") return;

    const timer = setTimeout(() => {
      setLabState("fix_applied");
    }, 1500);

    return () => clearTimeout(timer);
  }, [labState]);

  const runReproduction = () => {
    setActiveTrace("reproduction");
    setCurrentStep(0);
    setLabState("reproducing");
  };

  const applyFix = () => {
    setLabState("applying_fix");
  };

  const runFixedFlow = () => {
    setActiveTrace("fixed");
    setCurrentStep(0);
    setLabState("verifying_fix");
  };

  const steps = activeTrace === "reproduction" ? reproductionSteps : fixedSteps;
  const visibleSteps = steps.slice(0, currentStep);

  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Reproduction Lab</h3>
        <p className="text-xs text-foreground-tertiary mt-0.5">
          Reproduce the failure path, apply the proposed fix, and verify the recovered execution flow.
        </p>
      </div>

      {/* Control Bar */}
      <div className="px-6 py-3 bg-surface-secondary border-b border-border">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">Environment</span>
            <span className="text-xs font-mono text-foreground">Production-like</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">Scenario</span>
            <span className="text-xs font-mono text-foreground">Expired Session</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary">Repro ID</span>
            <span className="text-xs font-mono text-foreground">REPRO-0042</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Ready state */}
        {labState === "ready" && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-foreground-muted" />
              <span className="text-xs font-medium text-foreground-secondary">Ready to reproduce</span>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
              The investigation has identified a deterministic authentication failure. Run the reproduction to trace the failure path.
            </p>
            <button
              onClick={runReproduction}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs"
            >
              <Play className="w-4 h-4" />
              Run Reproduction
            </button>
          </div>
        )}

        {/* Reproducing / Verifying trace */}
        {(labState === "reproducing" || labState === "verifying_fix") && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
              <span className="text-xs font-medium text-foreground">
                {labState === "reproducing" ? "Reproducing failure path..." : "Running fixed flow..."}
              </span>
            </div>

            {/* Execution trace */}
            <div className="bg-sidebar-bg rounded-lg p-4 font-mono text-xs">
              <div className="space-y-3">
                {visibleSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <span className="text-sidebar-text-secondary shrink-0">{step.id}</span>
                    <div className="flex-1">
                      <div className="text-sidebar-text">{step.label}</div>
                      <div className={`mt-0.5 ${
                        step.type === "failure"
                          ? "text-critical-500"
                          : step.type === "success"
                            ? "text-resolved-500"
                            : "text-sidebar-text-secondary"
                      }`}>
                        {step.detail}
                      </div>
                    </div>
                    {step.type === "failure" && (
                      <AlertTriangle className="w-3.5 h-3.5 text-critical-500 shrink-0" />
                    )}
                    {step.type === "success" && (
                      <Check className="w-3.5 h-3.5 text-resolved-500 shrink-0" />
                    )}
                  </div>
                ))}
                {currentStep < steps.length && (
                  <div className="flex items-start gap-3">
                    <span className="text-sidebar-text-secondary shrink-0">{steps[currentStep].id}</span>
                    <div className="flex items-center gap-2 text-sidebar-text">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{steps[currentStep].label}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {labState === "reproducing" && (
              <p className="text-[11px] text-foreground-muted mt-3">
                Reproduction successful — failure reproduced
              </p>
            )}
          </div>
        )}

        {/* Bug reproduced */}
        {labState === "bug_reproduced" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-critical-500" />
              <span className="text-xs font-semibold text-critical-600 uppercase tracking-wider">Bug Reproduced</span>
            </div>

            <div className="bg-critical-50 border border-critical-200 rounded-lg p-4 mb-4">
              <dl className="space-y-2">
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Failure detected</dt>
                  <dd className="text-xs font-medium text-critical-600">Yes</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Failure point</dt>
                  <dd className="text-xs font-mono text-foreground">validateSession()</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">HTTP response</dt>
                  <dd className="text-xs font-mono text-critical-600">401 Unauthorized</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Reproducibility</dt>
                  <dd className="text-xs text-foreground">Consistent</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Root cause match</dt>
                  <dd className="text-xs font-mono text-foreground">94%</dd>
                </div>
              </dl>
            </div>

            <button
              onClick={applyFix}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs"
            >
              <Wrench className="w-4 h-4" />
              Apply Recommended Fix
            </button>
          </div>
        )}

        {/* Applying fix */}
        {labState === "applying_fix" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
              <span className="text-xs font-medium text-foreground">Applying proposed fix...</span>
            </div>
            <div className="space-y-2">
              {fixItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-resolved-600" />
                  <span className="text-xs text-foreground-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fix applied */}
        {labState === "fix_applied" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-resolved-500" />
              <span className="text-xs font-semibold text-resolved-600 uppercase tracking-wider">Fix Applied</span>
            </div>
            <div className="space-y-2 mb-4">
              {fixItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-resolved-600" />
                  <span className="text-xs text-foreground-secondary">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={runFixedFlow}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs"
            >
              <Play className="w-4 h-4" />
              Run Fixed Flow
            </button>
          </div>
        )}

        {/* Verified */}
        {labState === "verified" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-resolved-500" />
              <span className="text-xs font-semibold text-resolved-600 uppercase tracking-wider">Fixed Flow Verified</span>
            </div>

            <div className="bg-resolved-50 border border-resolved-200 rounded-lg p-4">
              <dl className="space-y-2">
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Authentication</dt>
                  <dd className="text-xs font-medium text-resolved-600 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Passed
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Session refresh</dt>
                  <dd className="text-xs font-medium text-resolved-600 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Passed
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Dashboard request</dt>
                  <dd className="text-xs font-medium text-resolved-600 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Passed
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-foreground-secondary">Failure reproduced before fix</dt>
                  <dd className="text-xs text-foreground">Yes</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
