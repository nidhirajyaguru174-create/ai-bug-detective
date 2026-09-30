"use client";

import { Sparkles } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";
import ReasoningTimeline from "@/app/components/ai-console/reasoning-timeline";
import HypothesisPanel from "@/app/components/ai-console/hypothesis-panel";
import SignalGraph from "@/app/components/ai-console/signal-graph";
import NextInspection from "@/app/components/ai-console/next-inspection";
import { aiExplanation } from "@/app/data/ai-console-data";

const topMetrics = [
  { label: "Signals Analyzed", value: "18" },
  { label: "Evidence Linked", value: "7" },
  { label: "Hypotheses Tested", value: "4" },
  { label: "Confidence", value: "94%" },
];

export default function AIConsolePage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ai-600 mb-1">
              AI Investigation Console
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              AI Reasoning Workspace
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary max-w-xl">
              Inspect how the investigation engine connected evidence, signals,
              patterns, and hypotheses.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ai-500" />
              <span className="text-xs font-semibold text-ai-600 uppercase tracking-wider">
                AI Engine · Online
              </span>
            </div>
            <span className="text-xs font-mono text-foreground-muted">
              CASE #0042
            </span>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {topMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-surface border border-border rounded-lg p-4 shadow-xs"
            >
              <div className="text-xs font-medium text-foreground-tertiary uppercase tracking-wide mb-1">
                {metric.label}
              </div>
              <div className="text-2xl font-semibold text-foreground">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Timeline + Hypothesis */}
          <div className="lg:col-span-2 space-y-6">
            <ReasoningTimeline />
            <HypothesisPanel />
          </div>

          {/* Right: Signal Graph + Next Inspection */}
          <div className="space-y-6">
            <SignalGraph />
            <NextInspection />
          </div>
        </div>

        {/* AI Explanation Callout */}
        <div className="bg-ai-50 border border-ai-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-ai-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-ai-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {aiExplanation.title}
              </h4>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {aiExplanation.text}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Confidence
                  </div>
                  <div className="text-sm font-semibold text-ai-600">
                    {aiExplanation.confidence}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Evidence chain
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {aiExplanation.evidenceChain} signals
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-foreground-tertiary uppercase tracking-wider">
                    Related pattern
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {aiExplanation.relatedPattern}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
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
                Reasoning Mode:{" "}
                <span className="font-mono text-foreground">Deep</span>
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
