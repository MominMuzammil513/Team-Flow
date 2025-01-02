import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db"
import { deleteAccountSchema } from "@/Schemas/deleteAccountSchema";
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 400, statusText: "Unauthorized User" });
    }
    const {email: userEmail} = session.user
    const body:unknown = await req.json()
    const result = deleteAccountSchema.safeParse(body)
    if(!result.success) return NextResponse.json("ERRORS.WRONG_DATA", {status: 401})
    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if (!user) {
            return NextResponse.json("user not found", { status: 404, statusText: "User not found" });
        }
        await db.user.delete({
            where: {
                id: user.id
            }
        });
        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        return NextResponse.json("ERROR.DB_ERRORS" + error, { status: 405 });
    }
};