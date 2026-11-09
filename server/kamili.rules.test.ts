import { describe, expect, it } from "vitest";
import { EDUCATION_SYSTEMS, getEducationSystemPrompt } from "../shared/educationSystems";
import {
  canChargeContribution,
  canPublishAIDraft,
  canUseTeacherAI,
  containsChildIdentifier,
  isContributionInstitutionallyPending,
  canRetrySync,
  isSensitiveSyncConflict,
} from "../shared/kamiliRules";

describe("Kamili APEE contribution rules", () => {
  it("does not charge a contribution before institutional validation", () => {
    expect(canChargeContribution("proposed")).toBe(false);
    expect(canChargeContribution("pending_validation")).toBe(false);
    expect(isContributionInstitutionallyPending("pending_validation")).toBe(true);
  });

  it("allows only approved contribution states to proceed to payment", () => {
    expect(canChargeContribution("authorized")).toBe(true);
    expect(canChargeContribution("voluntary")).toBe(true);
    expect(canChargeContribution("mandatory")).toBe(true);
    expect(canChargeContribution("contested")).toBe(false);
    expect(canChargeContribution("suspended")).toBe(false);
  });
});

describe("Kamili offline synchronization rules", () => {
  it("allows retry for pending or failed operations", () => {
    expect(canRetrySync("pending")).toBe(true);
    expect(canRetrySync("failed")).toBe(true);
    expect(canRetrySync("synced")).toBe(false);
  });

  it("requires human resolution for sensitive conflicts", () => {
    expect(isSensitiveSyncConflict("conflict", "grade")).toBe(true);
    expect(isSensitiveSyncConflict("conflict", "expense")).toBe(true);
    expect(isSensitiveSyncConflict("conflict", "equipment")).toBe(false);
    expect(isSensitiveSyncConflict("synced", "grade")).toBe(false);
  });
});

describe("Kamili responsible AI rules", () => {
  it("restricts AI authoring to teachers and administrators", () => {
    expect(canUseTeacherAI("teacher")).toBe(true);
    expect(canUseTeacherAI("administrator")).toBe(true);
    expect(canUseTeacherAI("student")).toBe(false);
    expect(canUseTeacherAI("parent")).toBe(false);
  });

  it("requires explicit teacher validation before publication", () => {
    expect(canPublishAIDraft("draft")).toBe(false);
    expect(canPublishAIDraft("needs_review")).toBe(false);
    expect(canPublishAIDraft("teacher_validated")).toBe(true);
  });

  it("detects common child identifiers in prompts", () => {
    expect(containsChildIdentifier("Nom: Jean et objectif de lecture")).toBe(true);
    expect(containsChildIdentifier("Créer une séquence de mathématiques pour CM2")).toBe(false);
  });
});


describe("Kamili education systems", () => {
  it("supports both official learning sub-systems", () => {
    expect(EDUCATION_SYSTEMS.francophone.language).toBe("Français");
    expect(EDUCATION_SYSTEMS.anglophone.language).toBe("English");
    expect(getEducationSystemPrompt("anglophone")).toContain("Sous-système anglophone");
    expect(EDUCATION_SYSTEMS.francophone.ui.overview).toBe("Vue d’ensemble");
    expect(EDUCATION_SYSTEMS.anglophone.ui.overview).toBe("Overview");
    expect(EDUCATION_SYSTEMS.francophone.curriculum).toContain("Mathématiques");
    expect(EDUCATION_SYSTEMS.anglophone.curriculum).toContain("Mathematics");
  });
});
