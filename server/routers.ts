import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, teacherProcedure } from "./_core/trpc";
import { getEducationSystemPrompt } from "@shared/educationSystems";

const childIdentifierPattern = /\b(?:nom|prénom|élève|matricule|téléphone|adresse)\s*[:=]/i;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  responsibleAI: router({
    generateDraft: teacherProcedure
      .input(z.object({
        subject: z.string().min(2).max(80),
        level: z.string().min(1).max(30),
        request: z.string().min(12).max(500),
        educationSystem: z.enum(["francophone", "anglophone"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (childIdentifierPattern.test(input.request)) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "La consigne contient un identifiant d’enfant. Retirez les données personnelles avant de continuer." });
        }

        const response = await invokeLLM({
          model: "gpt-5-mini",
          maxTokens: 1200,
          messages: [
            {
              role: "system",
              content: [
                "Tu es l’assistant pédagogique sécurisé de Kamili Éduc pour des enseignants de l’éducation de base au Cameroun.",
                "Tu proposes uniquement un brouillon pédagogique : l’enseignant doit le relire et le valider.",
                "N’invente pas de données sur des enfants, ne demande aucun nom, matricule, adresse, téléphone, note nominative ou diagnostic.",
                "N’utilise pas de classement individuel et ne remplace jamais le jugement professionnel de l’enseignant.",
                "Réponds dans la langue du sous-système sélectionné, avec objectif, activité, différenciation, évaluation formative et remédiation.",
                getEducationSystemPrompt(input.educationSystem),
                "Commence par la mention : BROUILLON ASSISTÉ PAR IA — VALIDATION ENSEIGNANT REQUISE.",
              ].join("\n"),
            },
            {
              role: "user",
              content: `Matière : ${input.subject}\nNiveau : ${input.level}\nDemande de l’enseignant : ${input.request}`,
            },
          ],
        });

        const content = response.choices?.[0]?.message?.content;
        const text = typeof content === "string" ? content.trim() : "";
        if (!text) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Le service IA n’a pas retourné de brouillon exploitable." });
        }

        return {
          draft: text,
          status: "needs_review" as const,
          audit: {
            actorId: ctx.user.id,
            actorRole: ctx.user.role,
            action: "ai_draft_generated",
            personalDataBlocked: false,
          },
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
