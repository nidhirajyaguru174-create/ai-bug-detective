export const caseData = {
  id: "#0042",
  title: "Authentication Failure",
  project: "Commerce API",
  severity: "critical",
  status: "Root Cause Identified",
  progress: 82,
  location: "AuthService → validateSession()",
  confidence: 94,
  lastActivity: "2 minutes ago",
};

export const investigationStages: {
  name: string;
  status: "completed" | "current" | "pending";
}[] = [
  { name: "Evidence Scan", status: "completed" },
  { name: "Execution Path", status: "completed" },
  { name: "Root Cause", status: "completed" },
  { name: "Impact Analysis", status: "current" },
  { name: "Fix Strategy", status: "pending" },
];

export const evidence = [
  {
    id: 1,
    title: "Expired session token",
    type: "Authentication",
    description:
      "Session token received by validateSession() is already expired.",
    source: "Auth middleware",
  },
  {
    id: 2,
    title: "Missing token refresh",
    type: "Session Management",
    description:
      "No refresh flow is triggered before the expired token reaches validation.",
    source: "SessionManager",
  },
  {
    id: 3,
    title: "Unauthorized response",
    type: "Runtime Behavior",
    description:
      "API returns 401 and the dashboard does not gracefully recover.",
    source: "Commerce API",
  },
];

export const executionPath: {
  label: string;
  status: "normal" | "failure";
}[] = [
  { label: "Login", status: "normal" },
  { label: "Session Middleware", status: "normal" },
  { label: "SessionManager", status: "normal" },
  { label: "validateSession()", status: "normal" },
  { label: "Expired Token", status: "failure" },
  { label: "401 Unauthorized", status: "failure" },
  { label: "Dashboard Request Failed", status: "failure" },
];

export const impactMetrics = [
  { label: "Affected Components", value: "2" },
  { label: "Affected Flow", value: "Authentication" },
  { label: "User Impact", value: "High" },
  { label: "Reproducibility", value: "Consistent" },
];

export const timeline = [
  {
    time: "09:41",
    title: "Evidence scanned",
    description: "3 relevant signals identified.",
  },
  {
    time: "09:42",
    title: "Execution path traced",
    description: "Failure isolated to authentication middleware.",
  },
  {
    time: "09:43",
    title: "Root cause identified",
    description: "Expired session token confirmed as primary cause.",
  },
  {
    time: "09:44",
    title: "Impact assessed",
    description: "2 components affected.",
  },
  {
    time: "09:45",
    title: "Fix strategy generated",
    description:
      "Session refresh + graceful authentication recovery recommended.",
  },
];
