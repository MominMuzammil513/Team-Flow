import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./imageSchema";


export const workspaceSchema = z.object({
    workspaceName:z.string().refine((username)=> /^[a-zA-Z0-9]+$/.test(username),{
        message: "SCHEMA.WORKSPACE.SPECIAL_CHARS"
    }),
    file: z.any().refine((file)=> file?.size <= MAX_FILE_SIZE, "SCHEMA.IMAGE.MAX")
    .refine((file)=> ACCEPTED_IMAGE_TYPES.includes(file?.type), "SCHEMA.IMAGE.SUPPORTED").optional().nullable()
})

export type WorkspaceSchema = z.infer<typeof workspaceSchema>