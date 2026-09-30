"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";
import InvestigationTypeSelector, {
  InvestigationType,
} from "@/app/components/investigation/investigation-type-selector";
import EvidenceInput from "@/app/components/investigation/evidence-input";
import InvestigationOptions from "@/app/components/investigation/investigation-options";
import InvestigationBrief from "@/app/components/investigation/investigation-brief";
import CaseContext from "@/app/components/investigation/case-context";
import RecentCase from "@/app/components/investigation/recent-case";

export default function InvestigatePage() {
  const [type, setType] = useState<InvestigationType>("code");
  const [evidence, setEvidence] = useState("");
  const [depth, setDepth] = useState("Standard");
  const [focus, setFocus] = useState<string[]>(["Root Cause"]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
              New Investigation
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Let&apos;s investigate a bug.
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary max-w-xl">
              Give the detective your code, error, or description. We&apos;ll
              trace the evidence and identify the likely root cause.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-foreground-muted">New Case</div>
            <div className="text-lg font-mono font-semibold text-foreground">
              #0042
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Input Workspace */}
          <div className="lg:col-span-2 space-y-6">
            <InvestigationTypeSelector value={type} onChange={setType} />
            <EvidenceInput
              value={evidence}
              onChange={setEvidence}
              type={type}
            />
            <InvestigationOptions
              depth={depth}
              onDepthChange={setDepth}
              focus={focus}
              onFocusChange={setFocus}
            />

            {/* CTA */}
            <div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs">
                Start Investigation
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-foreground-muted mt-2">
                AI analysis will examine the supplied evidence and generate an
                investigation report.
              </p>
            </div>
          </div>

          {/* Right: Brief + Context + Recent */}
          <div className="space-y-6">
            <InvestigationBrief />
            <CaseContext
              caseNumber="#0042"
              status="Not started"
              evidence={evidence ? "Evidence added" : "No evidence added"}
              analysis={depth}
              focus={focus}
            />
            <RecentCase />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
