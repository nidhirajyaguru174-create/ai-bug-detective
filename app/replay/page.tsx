"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AppShell from "@/app/components/layout/app-shell";
import ReplayControls from "@/app/components/replay/replay-controls";
import ReplayTimeline from "@/app/components/replay/replay-timeline";
import FailurePoint from "@/app/components/replay/failure-point";
import FlowComparison from "@/app/components/replay/flow-comparison";
import EventInspector from "@/app/components/replay/event-inspector";
import ReplayInsight from "@/app/components/replay/replay-insight";
import ReplayHistory from "@/app/components/replay/replay-history";
import { replaySteps } from "@/app/data/replay-data";

export default function ReplayPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalSteps = replaySteps.length;
  const isComplete = currentStep === totalSteps;

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, totalSteps]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  }, [totalSteps]);

  const handleTogglePlay = useCallback(() => {
    if (isComplete) {
      setCurrentStep(1);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [isComplete]);

  const handleRestart = useCallback(() => {
    setCurrentStep(1);
    setIsPlaying(false);
  }, []);

  const handleStepClick = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
              Investigation Time Machine
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Replay the Failure
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary max-w-xl">
              Step through the reconstructed execution path and compare the
              failure with the verified recovery flow.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="text-xs font-mono font-medium text-foreground">
              CASE #0042
            </span>
            <span className="text-xs text-foreground-tertiary">
              Authentication Failure
            </span>
            <span className="text-[10px] text-foreground-muted">
              Replay Mode: Simulated
            </span>
          </div>
        </div>

        {/* Replay Controls */}
        <div className="mb-6">
          <ReplayControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            isComplete={isComplete}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onTogglePlay={handleTogglePlay}
            onRestart={handleRestart}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Timeline + Failure Point */}
          <div className="lg:col-span-2 space-y-6">
            <ReplayTimeline
              steps={replaySteps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
            {currentStep === 5 && <FailurePoint />}
          </div>

          {/* Right: Event Inspector */}
          <div>
            <EventInspector />
          </div>
        </div>

        {/* Flow Comparison */}
        <div className="mb-6">
          <FlowComparison />
        </div>

        {/* Replay Insight + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ReplayInsight />
          <ReplayHistory />
        </div>

        {/* Navigation Links */}
        <div className="bg-surface border border-border rounded-lg p-4 shadow-xs mb-6">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-tertiary mb-3">
            Related Navigation
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/investigate/case-0042"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Case #0042 →
            </Link>
            <Link
              href="/ai-console"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              AI Console →
            </Link>
            <Link
              href="/patterns"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Related Pattern →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-resolved-500" />
              <span className="text-xs font-medium text-foreground">
                AI Engine: Online
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-tertiary">
              <span>
                Replay Engine:{" "}
                <span className="font-mono text-foreground">Simulated</span>
              </span>
              <span>
                Case: <span className="font-mono text-foreground">#0042</span>
              </span>
              <span className="text-foreground-muted">
                Data Source: Mock Investigation Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
