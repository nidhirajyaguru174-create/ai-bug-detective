export interface Incident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  status: string;
  detected: string;
  affectedServices: string[];
  relatedCases: number;
  pattern: string;
  aiCorrelation: number;
  description: string;
}

export const incidents: Incident[] = [
  {
    id: "#0027",
    title: "Authentication Failure Spike",
    severity: "critical",
    status: "Investigating",
    detected: "2 min ago",
    affectedServices: ["Commerce API", "Payments API", "Auth Service"],
    relatedCases: 3,
    pattern: "Authentication Recovery Gap",
    aiCorrelation: 94,
    description:
      "Multiple authentication failures share overlapping expired-session and missing-refresh signals.",
  },
  {
    id: "#0026",
    title: "Profile API Reliability Degradation",
    severity: "high",
    status: "Investigating",
    detected: "18 min ago",
    affectedServices: ["Customer Portal", "Profile API"],
    relatedCases: 4,
    pattern: "Null Response Handling",
    aiCorrelation: 86,
    description:
      "Multiple profile requests are producing null responses that propagate into downstream UI state.",
  },
  {
    id: "#0025",
    title: "Dashboard State Inconsistency",
    severity: "medium",
    status: "Monitoring",
    detected: "1 hour ago",
    affectedServices: ["Analytics Dashboard"],
    relatedCases: 5,
    pattern: "Stale Client State",
    aiCorrelation: 81,
    description:
      "Client-side state updates are becoming inconsistent after asynchronous metric refreshes.",
  },
];

export const incidentDetail = {
  affectedServices: ["Auth Service", "Commerce API", "Payments API"],
  correlatedCases: [
    {
      id: "#0042",
      title: "Authentication Failure",
      project: "Commerce API",
      severity: "critical" as const,
      progress: 82,
    },
    {
      id: "#0041",
      title: "Authentication Failure",
      project: "Payments API",
      severity: "high" as const,
      progress: 68,
    },
    {
      id: "#0037",
      title: "Session Expiration",
      project: "Account Service",
      severity: "high" as const,
      progress: 71,
    },
  ],
  pattern: { name: "Authentication Recovery Gap", confidence: 89 },
};

export const incidentTimeline = [
  {
    time: "09:41",
    title: "Signal detected",
    description: "Multiple authentication failures detected.",
    type: "critical" as const,
  },
  {
    time: "09:42",
    title: "AI correlation started",
    description: "Related authentication signals grouped.",
    type: "ai" as const,
  },
  {
    time: "09:43",
    title: "Pattern matched",
    description: "Authentication Recovery Gap identified.",
    type: "ai" as const,
  },
  {
    time: "09:44",
    title: "Impact assessed",
    description: "3 services connected to the incident.",
    type: "investigation" as const,
  },
  {
    time: "09:45",
    title: "Investigation started",
    description: "Case #0042 linked to the incident.",
    type: "investigation" as const,
  },
];

export const responseStages = [
  { name: "Signal Detection", status: "completed" as const },
  { name: "Correlation", status: "completed" as const },
  { name: "Impact Assessment", status: "completed" as const },
  { name: "Investigation", status: "current" as const },
  { name: "Resolution", status: "pending" as const },
];
