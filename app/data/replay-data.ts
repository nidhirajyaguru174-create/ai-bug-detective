export interface ReplayStep {
  id: number;
  component: string;
  event: string;
  status: string;
  statusType: "normal" | "failure" | "fix" | "success";
  timestamp: string;
  technicalValue?: string;
}

export const replaySteps: ReplayStep[] = [
  {
    id: 1,
    component: "User Request",
    event: "GET /dashboard",
    status: "Normal",
    statusType: "normal",
    timestamp: "09:41:02",
  },
  {
    id: 2,
    component: "Authentication Middleware",
    event: "Session detected",
    status: "Normal",
    statusType: "normal",
    timestamp: "09:41:02",
  },
  {
    id: 3,
    component: "SessionManager",
    event: "Session token loaded",
    status: "Normal",
    statusType: "normal",
    timestamp: "09:41:03",
  },
  {
    id: 4,
    component: "validateSession()",
    event: "Expired token detected",
    status: "Warning",
    statusType: "normal",
    timestamp: "09:41:03",
    technicalValue: "Token expired at 09:38:12",
  },
  {
    id: 5,
    component: "Failure Point",
    event: "401 Unauthorized",
    status: "Critical",
    statusType: "failure",
    timestamp: "09:41:03",
    technicalValue: "HTTP 401",
  },
  {
    id: 6,
    component: "Dashboard Request",
    event: "Request rejected",
    status: "Failed",
    statusType: "failure",
    timestamp: "09:41:03",
  },
  {
    id: 7,
    component: "Recommended Fix",
    event: "Refresh session before validation",
    status: "Fix",
    statusType: "fix",
    timestamp: "09:41:04",
  },
  {
    id: 8,
    component: "Recovered Flow",
    event: "Dashboard request succeeds",
    status: "Success",
    statusType: "success",
    timestamp: "09:41:04",
  },
];

export const failurePoint = {
  title: "Failure Detected",
  function: "validateSession()",
  signal: "Expired session token",
  response: "401 Unauthorized",
  severity: "Critical",
  confidence: 94,
};

export const originalFlow = [
  "GET /dashboard",
  "Session Middleware",
  "SessionManager",
  "validateSession()",
  "Expired Token",
  "401 Unauthorized",
  "Request Failed",
];

export const recoveredFlow = [
  "GET /dashboard",
  "Session Middleware",
  "SessionManager",
  "Refresh Session",
  "New Token",
  "validateSession()",
  "Dashboard Success",
];

export const eventInspectorData = {
  event: "validateSession()",
  component: "AuthService",
  input: "Expired session token",
  output: "401 Unauthorized",
  relatedEvidence: ["E-0042-01", "E-0042-02"],
  relatedPattern: "Authentication Recovery Gap",
  aiConfidence: 94,
};

export const replayInsight = {
  title: "Replay Insight",
  text: "The failure occurs before the dashboard request reaches the application layer. The reconstructed flow indicates that token refresh should occur before session validation.",
  evidenceChain: 4,
  rootCauseConfidence: 94,
  patternMatch: "Authentication Recovery Gap",
};

export const replayHistory = [
  { label: "Original Failure", time: "09:41:03", status: "Detected" },
  { label: "Root Cause Identified", time: "09:43:12", status: "Complete" },
  { label: "Fix Recommended", time: "09:45:00", status: "Complete" },
  { label: "Fix Applied", time: "09:46:30", status: "Complete" },
  { label: "Verification Passed", time: "09:48:00", status: "Verified" },
];
