import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"


export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 400, statusText: "Unauthorized User" });
    }
    const body: unknown = await req.json();

    const result = z.object({
        profileImage: z.string()
    }).safeParse(body);
    if (!result.success) {
        return NextResponse.json("ERROR WRONG DATA", { status: 401 });
    }
    const { profileImage } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if (!user) {
            return NextResponse.json("user not found", { status: 404, statusText: "User not found" });
        }
        const updatedUser = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: profileImage
            }
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json("ERROR.DB_ERRORS" + error, { status: 405 });
    }
};