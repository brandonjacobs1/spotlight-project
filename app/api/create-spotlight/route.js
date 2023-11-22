import {createSpotlight} from "@/lib/db/get-spotlight"
import getUploadUrl from "@/lib/s3/upload-image"
import Server from "next/server"

export async function POST(req){
    const response = await req.json()
    try {
        const url = getUploadUrl(response.filePath, response.fileExtension)
        const dbCall = createSpotlight(response.values, response.filePath)
        const resolved = await Promise.all([url, dbCall])
        console.log(`After Promises: ${JSON.stringify(resolved)}`)
        return Server.NextResponse.json({url: resolved[0], spotlight: resolved[1]})
    } catch (e) {
        console.log(`Error in create-spotlight POST ${e}`)
        return Server.NextResponse.json({error: e, url:null})
    }
}