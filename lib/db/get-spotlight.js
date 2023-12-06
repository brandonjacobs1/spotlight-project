import prisma from "@/lib/db/prisma";

export async function getSpotlight(id) {
    id = Number(id)
    try {
        return await prisma.spotlight.findUniqueOrThrow({where: {id: id}})
    } catch (error) {
        console.log(`Error getting id: ${id} from DB`)
        return null
    }
}

export async function upsertSpotlight(body, image){
    console.log(`in createSpotlight ${JSON.stringify(body)}`)
    let spotlight = {
        last_name: body.last_name,
        first_name_husband: body.first_name_husband,
        first_name_wife: body.first_name_wife,
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
    // Create ID value where 0 will evaluate to not found and new record will be created
    const id = body.id ?? 0
    // This is for the update
    if (body.id) spotlight.id = id
    try {
        const response = await prisma.spotlight.upsert({
            where: {id: id},
            update: {...spotlight},
            create: {...spotlight}
        });
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}
