import prisma from "@/lib/db/prisma";

export async function getSpotlight(id) {
    try {
        return await prisma.spotlight.findUniqueOrThrow({where: {id: {equals: id}}})
    } catch (error) {
        console.log(`Error getting id: ${id} from DB`)
        return null
    }
}

export async function createSpotlight(body, image){
    console.log(`in createSpotlight ${JSON.stringify(body)}`)
    const spotlight = {
        last_name: body.last_name,
        first_name_husband: body.husband_first_name,
        first_name_wife: body.wife_first_name,
        bio: body.bio,
        member_type: body.member_type,
        status: body.status,
        date_asked: body.date_asked,
        date_ready: body.date_ready,
        date_planned: body.date_planned,
        date_slacked: body.date_slacked,
        date_joined: body.date_joined,
        image: image
    }
    try {
        const response = await prisma.spotlight.create({ data: spotlight });
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}
