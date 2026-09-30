export interface TimelineStep {
  id: string;
  title: string;
  status: string;
  statusType: "complete" | "primary" | "ready";
  details: string;
  meta: { label: string; value: string }[];
}

export const timelineSteps: TimelineStep[] = [
  {
    id: "01",
    title: "Evidence Ingested",
    status: "COMPLETE",
    statusType: "complete",
    details:
      "Expired session token detected in authentication middleware.",
    meta: [{ label: "Evidence", value: "Auth middleware" }],
  },
  {
    id: "02",
    title: "Signal Correlation",
    status: "COMPLETE",
    statusType: "complete",
    details:
      "Token expiry correlated with missing refresh handling and repeated 401 responses.",
    meta: [{ label: "Signals", value: "3 correlated" }],
  },
  {
    id: "03",
    title: "Execution Path Reconstructed",
    status: "COMPLETE",
    statusType: "complete",
    details:
      "Login → Session Middleware → SessionManager → validateSession() → 401",
    meta: [{ label: "Confidence", value: "91%" }],
  },
  {
    id: "04",
    title: "Root Cause Hypothesis",
    status: "PRIMARY HYPOTHESIS",
    statusType: "primary",
    details: "Session validation occurs before token refresh.",
    meta: [{ label: "Confidence", value: "94%" }],
  },
  {
    id: "05",
    title: "Impact Assessment",
    status: "COMPLETE",
    statusType: "complete",
    details:
      "Dashboard requests fail consistently when the session token expires.",
    meta: [{ label: "Impact", value: "High" }],
  },
  {
    id: "06",
    title: "Recommended Action",
    status: "READY",
    statusType: "ready",
    details:
      "Introduce token refresh handling before session validation.",
    meta: [{ label: "Priority", value: "High" }],
  },
];

export interface Hypothesis {
  id: string;
  type: "primary" | "alternative";
  title: string;
  confidence: number;
  evidence: number;
  signals: number;
  status: "supported" | "weak" | "unlikely";
  details: string;
}

export const hypotheses: Hypothesis[] = [
  {
    id: "1",
    type: "primary",
    title: "Token refresh is missing before validation.",
    confidence: 94,
    evidence: 4,
    signals: 3,
    status: "supported",
    details:
      "The strongest evidence chain shows an expired token reaching validation without a refresh attempt. The same failure path appears across multiple authentication cases, increasing confidence in the recovery-gap hypothesis.",
  },
  {
    id: "2",
    type: "alternative",
    title: "Session storage returned stale credentials.",
    confidence: 41,
    evidence: 2,
    signals: 1,
    status: "weak",
    details:
      "Some evidence suggests session storage may have returned stale credentials, but this does not fully explain the consistent 401 pattern across all affected services.",
  },
  {
    id: "3",
    type: "alternative",
    title: "Authentication middleware rejected a valid session.",
    confidence: 18,
    evidence: 1,
    signals: 1,
    status: "unlikely",
    details:
      "Limited evidence supports this hypothesis. The middleware correctly rejected expired tokens, so this is unlikely to be the root cause.",
  },
];

export const signalGraphNodes = [
  { id: "1", label: "Expired Token" },
  { id: "2", label: "Missing Refresh" },
  { id: "3", label: "validateSession()" },
  { id: "4", label: "401 Response" },
  { id: "5", label: "Dashboard Request" },
  { id: "6", label: "Authentication Recovery Gap" },
];

export const nextInspections = [
  {
    service: "SessionManager",
    reason: "Token lifecycle and refresh handling",
  },
  {
    service: "Auth Middleware",
    reason: "Validation order and failure handling",
  },
  {
    service: "Dashboard Request Handler",
    reason: "Downstream response to 401 failures",
  },
];

export const aiExplanation = {
  title: "Why the engine believes this is the root cause",
  text: "The strongest evidence chain shows an expired token reaching validation without a refresh attempt. The same failure path appears across multiple authentication cases, increasing confidence in the recovery-gap hypothesis.",
  confidence: 94,
  evidenceChain: 4,
  relatedPattern: "Authentication Recovery Gap",
};
