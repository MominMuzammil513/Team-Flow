import { getAuthSession } from "@/lib/authOption";
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 2 } })
    .middleware(async () => {
      const user = await getAuthSession();
      if (!user?.user.id) throw new Error("Unauthorized");
      return { userId: user.user.id };
    })
    .onUploadComplete(async () => {}),
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } }).middleware(async () => {
    const user = await getAuthSession();
    if (!user?.user.id) throw new Error("Unauthorized");
    return { userId: user.user.id };
  }).onUploadComplete(async () => {}),
} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter