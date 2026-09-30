export interface Pattern {
  id: number;
  title: string;
  category: string;
  cases: number;
  signals: number;
  confidence: number;
  affectedServices: string[];
  description: string;
  status: "recurring" | "emerging";
}

export const patterns: Pattern[] = [
  {
    id: 1,
    title: "Authentication Recovery Gap",
    category: "Authentication",
    cases: 3,
    signals: 8,
    confidence: 89,
    affectedServices: ["Commerce API", "Payments API"],
    description:
      "Expired or invalid sessions reach protected request validation without a reliable recovery path.",
    status: "recurring",
  },
  {
    id: 2,
    title: "Null Response Handling",
    category: "Reliability",
    cases: 4,
    signals: 11,
    confidence: 86,
    affectedServices: ["Customer Portal", "Profile API"],
    description:
      "Unexpected null or empty responses propagate into downstream UI logic without defensive validation.",
    status: "recurring",
  },
  {
    id: 3,
    title: "API Timeout / Retry Gap",
    category: "Performance",
    cases: 3,
    signals: 7,
    confidence: 81,
    affectedServices: ["Orders Service", "Search API"],
    description:
      "Slow upstream responses are not consistently retried or handled before downstream requests time out.",
    status: "emerging",
  },
  {
    id: 4,
    title: "Stale Client State",
    category: "Frontend",
    cases: 5,
    signals: 13,
    confidence: 84,
    affectedServices: ["Analytics Dashboard", "Admin Portal"],
    description:
      "Client state remains out of sync after asynchronous data updates.",
    status: "recurring",
  },
  {
    id: 5,
    title: "Incomplete Error Recovery",
    category: "Reliability",
    cases: 3,
    signals: 9,
    confidence: 78,
    affectedServices: ["Dashboard", "Notifications"],
    description:
      "Failure responses are detected but do not consistently trigger a recovery or fallback state.",
    status: "emerging",
  },
];

export const patternDetail = {
  title: "Authentication Recovery Gap",
  confidence: 89,
  connectedCases: [
    { id: "#0042", title: "Authentication Failure", project: "Commerce API" },
    { id: "#0041", title: "Authentication Failure", project: "Payments API" },
    { id: "#0037", title: "Session Expiration", project: "Account Service" },
  ],
  commonSignals: [
    "Expired session/token",
    "Missing refresh attempt",
    "Authentication middleware rejection",
    "401 response",
  ],
  failurePath: [
    "Request",
    "Session Check",
    "Expired Session",
    "Validation",
    "401",
    "Request Failure",
  ],
  interpretation:
    "The connected cases share a similar recovery boundary: session validity is checked before a reliable refresh or fallback path is established.",
};

export const relationships = [
  { from: "Authentication Recovery Gap", to: "Incomplete Error Recovery" },
  { from: "Null Response Handling", to: "Incomplete Error Recovery" },
  { from: "Stale Client State", to: "Async State Drift" },
];

export const weeklyActivity = [
  { week: "Week 1", count: 4 },
  { week: "Week 2", count: 6 },
  { week: "Week 3", count: 5 },
  { week: "Week 4", count: 9 },
];
