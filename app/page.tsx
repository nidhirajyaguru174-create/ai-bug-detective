import Link from "next/link";
import { Plus } from "lucide-react";
import AppShell from "@/app/components/layout/app-shell";
import MetricCard from "@/app/components/dashboard/metric-card";
import InvestigationCard from "@/app/components/dashboard/investigation-card";
import ActivityTimeline from "@/app/components/dashboard/activity-timeline";
import SeverityOverview from "@/app/components/dashboard/severity-overview";
import { metrics, investigations, activities, severityOverview } from "@/app/data/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Good evening, Developer.
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Your debugging investigation center.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cases"
              className="px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150"
            >
              View all cases
            </Link>
            <Link
              href="/investigate"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-150 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              New Investigation
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active Investigations */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Active Investigations
              </h3>
              <p className="text-sm text-foreground-secondary">
                Cases currently being analyzed or awaiting resolution.
              </p>
            </div>
            {investigations.map((investigation) => (
              <InvestigationCard
                key={investigation.id}
                id={investigation.id}
                title={investigation.title}
                project={investigation.project}
                severity={investigation.severity}
                status={investigation.status}
                progress={investigation.progress}
                location={investigation.location}
                lastActivity={investigation.lastActivity}
              />
            ))}
          </div>

          {/* Right: AI Activity + Severity */}
          <div className="space-y-6">
            <ActivityTimeline activities={activities} />
            <SeverityOverview data={severityOverview} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
