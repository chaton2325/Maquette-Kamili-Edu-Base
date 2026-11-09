export type ContributionStatus =
  | "proposed"
  | "pending_validation"
  | "authorized"
  | "voluntary"
  | "mandatory"
  | "suspended"
  | "contested";

export type SyncState = "synced" | "pending" | "failed" | "conflict" | "server_validated" | "rejected";
export type AIRole = "teacher" | "student" | "parent" | "administrator";
export type KamiliRole = AIRole | "school_director" | "apee_officer" | "inspector" | "football_coordinator" | "auditor";
export type UserAccountRole = "user" | "admin" | "teacher" | "school_director" | "apee_officer" | "inspector" | "football_coordinator" | "auditor" | "student" | "parent";
export type AIReviewStatus = "draft" | "needs_review" | "teacher_validated";

export function canChargeContribution(status: ContributionStatus) {
  return status === "authorized" || status === "voluntary" || status === "mandatory";
}

export function isContributionInstitutionallyPending(status: ContributionStatus) {
  return status === "proposed" || status === "pending_validation";
}

export function canRetrySync(state: SyncState) {
  return state === "pending" || state === "failed";
}

export function isSensitiveSyncConflict(state: SyncState, entity: "attendance" | "grade" | "expense" | "equipment") {
  return state === "conflict" && ["attendance", "grade", "expense"].includes(entity);
}

export function canUseTeacherAI(role: KamiliRole) {
  return role === "teacher" || role === "school_director" || role === "administrator";
}

export function canPublishAIDraft(status: AIReviewStatus) {
  return status === "teacher_validated";
}

export function containsChildIdentifier(text: string) {
  return /\b(?:nom|prénom|élève|matricule|téléphone|adresse)\s*[:=]/i.test(text);
}

/** Maps the current OAuth roles to the institution roles used by Kamili policies. */
export function getKamiliRole(role: UserAccountRole): KamiliRole {
  return role === "admin" ? "administrator" : role === "user" ? "parent" : role;
}
