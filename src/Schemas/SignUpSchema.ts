import { z } from "zod"

export const SignUpSchema = z.object({
    // name: z.string(),
    email: z.string().email("please enter a valid email"),
    username: z.string().min(2, "Username must be at least 2 characters long"),
    password: z.string().min(10,"Password must be at least 10 characters long"),
    // confirmPassword: z.string().min(6),
})

export type SignUpSchema = z.infer<typeof SignUpSchema>