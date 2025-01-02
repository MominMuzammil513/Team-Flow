import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 400, statusText: "Unauthorized User" });
    }
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
                image: null
            }
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json("ERROR.DB_ERRORS" + error, { status: 405 });
    }
};