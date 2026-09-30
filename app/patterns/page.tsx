"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";
import PatternCard from "@/app/components/patterns/pattern-card";
import PatternDetail from "@/app/components/patterns/pattern-detail";
import PatternRelationships from "@/app/components/patterns/pattern-relationships";
import PatternActivity from "@/app/components/patterns/pattern-activity";
import { patterns } from "@/app/data/pattern-data";

const summaryMetrics = [
  { label: "Recurring Patterns", value: "7" },
  { label: "Cases Connected", value: "18" },
  { label: "Critical Patterns", value: "2" },
  { label: "New This Week", value: "3" },
];

export default function PatternsPage() {
  const [expandedPattern, setExpandedPattern] = useState<number | null>(null);

  const togglePattern = (id: number) => {
    setExpandedPattern((prev) => (prev === id ? null : id));
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
              Pattern Intelligence
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Recurring Bug Patterns
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Signals and recurring failure patterns detected across your
              investigations.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ai-500" />
              <span className="text-xs font-semibold text-ai-600 uppercase tracking-wider">
                AI Analysis
              </span>
            </div>
            <span className="text-xs text-foreground-tertiary">
              Monitoring 42 cases
            </span>
            <span className="text-[10px] text-foreground-muted">
              Last analyzed: Just now
            </span>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {summaryMetrics.map((metric) => (
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

        {/* Top Recurring Patterns */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Top Recurring Patterns
            </h3>
            <p className="text-xs text-foreground-tertiary mt-0.5">
              Patterns identified from investigation evidence.
            </p>
          </div>

          <div className="space-y-3">
            {patterns.map((pattern) => (
              <div key={pattern.id}>
                <PatternCard
                  pattern={pattern}
                  isExpanded={expandedPattern === pattern.id}
                  onToggle={() => togglePattern(pattern.id)}
                />
                {expandedPattern === pattern.id && pattern.id === 1 && (
                  <PatternDetail />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Relationships + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PatternRelationships />
          <PatternActivity />
        </div>

        {/* Investigation Signal Callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 mb-1">
                Investigation Signal
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Authentication recovery appears across multiple cases
              </h4>
              <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
                Three mock investigations contain overlapping authentication
                recovery signals. This may indicate a shared failure pattern
                worth inspecting across related services.
              </p>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 border border-amber-200 rounded-lg hover:bg-amber-200 transition-colors duration-150"
              >
                View Related Cases
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
