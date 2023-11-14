import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server";

export async function getAllSpotlights() {
    try {
        return await prisma.spotlight.findMany();
    } catch (error) {
        console.log(`Error getting all spotlights`)
        return null
    }
}