export interface Metric {
  label: string;
  value: string;
  supportingText: string;
  icon: string;
  trend?: "up" | "down";
  trendLabel?: string;
  supportingTextColor?: string;
}

export interface Investigation {
  id: number;
  title: string;
  project: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  progress: number;
  location: string;
  lastActivity: string;
}

export interface ActivityItem {
  id: number;
  type: "root-cause" | "evidence" | "pattern" | "fix";
  title: string;
  description: string;
  time: string;
}

export interface SeverityItem {
  label: string;
  count: number;
  color: string;
}

export const metrics: Metric[] = [
  {
    label: "Total Cases",
    value: "24",
    supportingText: "+4 this week",
    icon: "FolderOpen",
    trend: "up",
    trendLabel: "+4",
    supportingTextColor: "text-resolved-600",
  },
  {
    label: "Open Cases",
    value: "7",
    supportingText: "3 need attention",
    icon: "AlertCircle",
    supportingTextColor: "text-high-600",
  },
  {
    label: "Critical Issues",
    value: "3",
    supportingText: "2 unresolved",
    icon: "AlertTriangle",
    supportingTextColor: "text-critical-600",
  },
  {
    label: "Avg. Resolution",
    value: "18 min",
    supportingText: "12% faster this week",
    icon: "Clock",
    trend: "down",
    trendLabel: "12%",
    supportingTextColor: "text-resolved-600",
  },
];

export const investigations: Investigation[] = [
  {
    id: 1,
    title: "Authentication Failure",
    project: "Commerce API",
    severity: "critical",
    status: "Root Cause Analysis",
    progress: 82,
    location: "AuthService → validateSession()",
    lastActivity: "4 min ago",
  },
  {
    id: 2,
    title: "Null Reference in User Profile",
    project: "Customer Portal",
    severity: "high",
    status: "Evidence Collected",
    progress: 64,
    location: "ProfileController → getUser()",
    lastActivity: "11 min ago",
  },
  {
    id: 3,
    title: "Stale UI State",
    project: "Analytics Dashboard",
    severity: "medium",
    status: "Fix Suggested",
    progress: 91,
    location: "Dashboard → useMetrics()",
    lastActivity: "24 min ago",
  },
];

export const activities: ActivityItem[] = [
  {
    id: 1,
    type: "root-cause",
    title: "Root cause identified",
    description: "Authentication failure traced to an expired session token.",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "evidence",
    title: "Evidence discovered",
    description: "Null response detected from /user/profile.",
    time: "8 min ago",
  },
  {
    id: 3,
    type: "pattern",
    title: "Recurring pattern detected",
    description: "3 similar API response-handling issues found.",
    time: "14 min ago",
  },
  {
    id: 4,
    type: "fix",
    title: "Fix recommendation generated",
    description: "Added defensive response validation.",
    time: "21 min ago",
  },
];

export const severityOverview: SeverityItem[] = [
  { label: "Critical", count: 3, color: "critical" },
  { label: "High", count: 8, color: "high" },
  { label: "Medium", count: 9, color: "medium" },
  { label: "Low", count: 4, color: "low" },
];
