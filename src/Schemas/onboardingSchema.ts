import { string, z } from "zod";


export const onboardingSchema = z.object({
    name: z.string().optional().nullable(),
    surname: z.string().optional().nullable(),
    useCase: z.string().refine((string) => string === "WORK" || string === "STUDY" || string === "PERSONAL_USE"),
    workspaceName: z.string().min(4).refine((surname) => /^[a-zA-Z0-9]+$/.test(surname)),
    workspaceImage: z.string().optional().nullable()
})

export type OnBoardingSchema = z.infer<typeof onboardingSchema>