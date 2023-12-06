import * as React from 'react';
import {getSpotlight} from "@/lib/db/get-spotlight";
import ClientComponent from "@/app/(site)/editSpotlight/[id]/client-component";
import getImageUrl from "@/lib/s3/get-image";
import {notFound} from "next/navigation";



export default async function Page({params}) {

    let initialValues = await getSpotlight(params.id)

    //Check if spotlight exists
    if (!initialValues) return notFound()

    const imagePath = initialValues.image
    let imageURL
    if (initialValues.image) {
        // Formats image object to be recognized by the UploadFile component.
        initialValues.image = { name: imagePath.split('/').pop() }
        // Get presigned url
        imageURL = await getImageUrl(imagePath)
    } else {
        initialValues.image = undefined
    }

    return <ClientComponent initialValues={initialValues} imageURL={imageURL}></ClientComponent>
}