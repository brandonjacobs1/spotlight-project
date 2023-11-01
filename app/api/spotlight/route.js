import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"


// http://localhost:3000/api/news (GET)
export async function GET() {
    try {
        const spotlight = await prisma.spotlight.findFirst();
        return NextResponse.json({ spotlight: spotlight, error: null })
    } catch (error) {
        return NextResponse.json({ error: error.message, spotlight: null })
    }
}