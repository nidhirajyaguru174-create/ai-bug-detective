export const beforeCode = `const session = getSession();
validateSession(session);`;

export const afterCode = `const session = await refreshSessionIfNeeded();

if (!session) {
  redirectToLogin();
  return;
}

validateSession(session);`;

export const originalFlow = [
  "Request",
  "Session Middleware",
  "SessionManager",
  "validateSession()",
  "Expired Token",
  "401",
  "Dashboard Failure",
];

export const fixedFlow = [
  "Request",
  "Session Middleware",
  "SessionManager",
  "Refresh Session",
  "New Token",
  "validateSession()",
  "Dashboard Success",
];

export const verificationChecks = [
  { check: "Session expiry handling", before: "FAIL", after: "PASS" },
  { check: "Token validation", before: "FAIL", after: "PASS" },
  { check: "401 response handling", before: "FAIL", after: "PASS" },
  { check: "Dashboard recovery", before: "FAIL", after: "PASS" },
  { check: "Authentication flow", before: "FAIL", after: "PASS" },
];

export const impactCards = [
  { label: "Affected Component", value: "AuthService" },
  { label: "Affected Flow", value: "Authentication" },
  { label: "User Impact", value: "High → Reduced" },
  { label: "Failure Reproducibility", value: "Consistent → Prevented" },
];

export const changePoints = [
  "Refresh before validation",
  "Handle refresh failure safely",
  "Prevent invalid requests from reaching protected resources",
];

export const fixConfidence = {
  confidence: 94,
  supportingEvidence: 4,
  relatedCases: ["#0042", "#0041", "#0037"],
  relatedPattern: "Authentication Recovery Gap",
};
