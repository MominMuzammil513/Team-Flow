import { z } from "zod";

export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const imageSchema = z.object({
    image:z.any().optional().refine((file)=> file?.size <= MAX_FILE_SIZE, "SCHEMA.IMAGE.MAX")
    .refine((file)=> ACCEPTED_IMAGE_TYPES.includes(file?.type), "SCHEMA.IMAGE.SUPPORTED")
})

// import { z } from "zod";

// export const imageSchema = z.object({
//     image: z
//         .instanceof(File)
//         .refine(file => file.size < 5 * 1024 * 1024, { message: "File size must be less than 5MB" })
//         .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Invalid file type" }),
// });


export type ImageSchema = z.infer<typeof imageSchema>;