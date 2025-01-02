import { z } from "zod";


export const additionalInfoUserSecondPart = z.object({
    useCase: z.enum(["WORK","STUDY","PERSONAL_USE"],{
        required_error: "You need to select notification type."
    })
})

export type AdditionalInfoUserSecondPart = z.infer<typeof additionalInfoUserSecondPart>
