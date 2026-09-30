"use client";

import { useState, useCallback } from "react";
import AppShell from "@/app/components/layout/app-shell";
import ComparisonHeader from "@/app/components/compare/comparison-header";
import FixSummary from "@/app/components/compare/fix-summary";
import CodeComparison from "@/app/components/compare/code-comparison";
import ChangeExplanation from "@/app/components/compare/change-explanation";
import ExecutionComparison from "@/app/components/compare/execution-comparison";
import ImpactAnalysis from "@/app/components/compare/impact-analysis";
import VerificationEvidence from "@/app/components/compare/verification-evidence";
import FixConfidence from "@/app/components/compare/fix-confidence";
import ReviewActions from "@/app/components/compare/review-actions";

export default function ComparePage() {
  const [isReviewed, setIsReviewed] = useState(false);

  const handleReview = useCallback(() => {
    setIsReviewed(true);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ComparisonHeader />

        {/* Fix Summary */}
        <FixSummary />

        {/* Code Comparison */}
        <CodeComparison />

        {/* Change Explanation */}
        <ChangeExplanation />

        {/* Execution Path Comparison */}
        <ExecutionComparison />

        {/* Impact Analysis */}
        <ImpactAnalysis />

        {/* Verification Evidence */}
        <VerificationEvidence />

        {/* Fix Confidence */}
        <FixConfidence />

        {/* Review Actions */}
        <ReviewActions onReview={handleReview} isReviewed={isReviewed} />

        {/* Footer */}
        <div className="bg-surface border border-border rounded-lg p-4 shadow-xs mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-resolved-500" />
              <span className="text-xs font-medium text-foreground">
                AI Engine: Online
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-tertiary">
              <span>
                Comparison Engine:{" "}
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
