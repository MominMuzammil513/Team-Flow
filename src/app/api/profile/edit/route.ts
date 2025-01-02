import { getAuthSession } from "@/lib/authOption";
import { db } from "@/lib/db";
import { accountInfoSettingsSchema } from "@/Schemas/accountInfoSettingsSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized User",
    });
  }
  const body: unknown = await req.json();

  const result = accountInfoSettingsSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json("ERROR WRONG DATA", { status: 401 });
  }
  const { name, surname, username } = result.data;

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return NextResponse.json("user not found", {
        status: 404,
        statusText: "User not found",
      });
    }
    const existedUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existedUsername && existedUsername.id !== user.id)
      return NextResponse.json("ERRORS.TAKEN_USERNAME", { status: 402 });
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        surname,
        username,
      },
    });
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    return NextResponse.json("ERROR.DB_ERRORS" + error, { status: 405 });
  }
};
