import { db } from "@/lib/db"
import { SignUpSchema } from "@/Schemas/SignUpSchema"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const POST = async (request: Request) => {
    const body: unknown = await request.json()
    const result = SignUpSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json("Missing fields, wrong Data", { status: 400 })
    }
    const { email, password, username } = result.data

    try {
        const existUsername = await db.user.findUnique({
            where: {
                username
            }
        })
        if (existUsername) return NextResponse.json("Username already exists", { status: 408 })

        const existEmail = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existEmail) return NextResponse.json("Email already exists", { status: 409 })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data: {
                email,
                username,
                hashedPassword,
            }
        })
        return NextResponse.json(newUser, { status: 200 })
    } catch (error: unknown) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 })
    }
}