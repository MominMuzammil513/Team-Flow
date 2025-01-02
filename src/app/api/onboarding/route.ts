import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db"
import { onboardingSchema } from "@/Schemas/onboardingSchema";
import { UseCase } from "@prisma/client";
import { NextResponse } from "next/server"
import { z } from "zod"


export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 400, statusText: "Unauthorized User" });
    }
    const body: unknown = await req.json();

    const result = onboardingSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json("ERROR WRONG DATA", { status: 401 });
    }
    const { useCase, workspaceName, name, surname, workspaceImage } = result.data;

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
                completedOnBoarding: true,
                name,
                surname,
                useCase: useCase as UseCase
            }
        });
        const workspace = await db.workspace.create({
            data: {
                creatorId: user.id,
                name: workspaceName,
                image: workspaceImage
            }
        })
        await db.subscription.create({
            data: {
                userId: user.id,
                workspaceId: workspace.id
            }
        })
        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        return NextResponse.json("ERROR.DB_ERRORS" + error, { status: 405 });
    }
};