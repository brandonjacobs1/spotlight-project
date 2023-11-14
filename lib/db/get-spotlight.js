import prisma from "@/lib/db/prisma";

export async function getSpotlight(id) {
    try {
        return await prisma.spotlight.findUniqueOrThrow({where: {id: {equals: id}}})
    } catch (error) {
        console.log(`Error getting id: ${id} from DB`)
        return null
    }
}