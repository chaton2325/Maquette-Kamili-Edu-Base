import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("responsibleAI.generateDraft", () => {
  const makeContext = (role: "user" | "teacher"): TrpcContext => {
    const now = new Date();
    return {
      user: {
        id: 7,
        openId: `user-${role}`,
        email: `${role}@example.com`,
        name: role === "teacher" ? "Enseignant Démo" : "Utilisateur Démo",
        loginMethod: "demo",
        role,
        createdAt: now,
        updatedAt: now,
        lastSignedIn: now,
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
  };

  it("rejects a generic account before any model call", async () => {
    const caller = appRouter.createCaller(makeContext("user"));
    await expect(caller.responsibleAI.generateDraft({
      subject: "Français",
      level: "CM2",
      request: "Prépare une séquence de lecture sans données personnelles",
      educationSystem: "francophone",
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("blocks child identifiers before calling the model", async () => {
    const caller = appRouter.createCaller(makeContext("teacher"));
    await expect(caller.responsibleAI.generateDraft({
      subject: "Français",
      level: "CM2",
      request: "Nom: Jean, prépare une appréciation de lecture",
      educationSystem: "francophone",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
