import { z } from "zod"

export const SignInSchema = z.object({
    // name: z.string(),
    email: z.string().email("please enter a valid email"),
    password: z.string().min(10,"Password must be at least 10 characters long"),
    // confirmPassword: z.string().min(6),
})

export type SignInSchema = z.infer<typeof SignInSchema>