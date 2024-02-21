'use client'
import React from "react";
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from "@mui/material/IconButton";



export default function Share({ id, bio, imageLoaded, url, name}) {

    async function createImage (id) {
        try {
            if (typeof window !== "undefined") {
                const response = await fetch(url)
                const blob = await response.blob();
                const filesArray = [
                    new File(
                        [blob],
                        id.split('/').pop(),
                        {
                            type: blob.type,
                            lastModified: new Date().getTime()
                        }
                    )
                ]
                shareFile(filesArray, name, bio)
            }
        } catch (e) {
            console.log('Error in createImage', e)
        }
    }

    const shareFile = (files, title, bio) => {
        try {
        if (navigator.canShare && navigator.canShare({ files: files })) {
            navigator
                .share({
                    files: files,
                    title,
                    text: `*${name}*\n\n${bio}`
                })
                .then(() => console.log("Share was successful."))
                .catch((error) => console.log("Sharing failed", error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }
        } catch (e){
            console.log('Error in dataURLtoFile', e)
        }
    };

    return imageLoaded ? (
            <IconButton aria-label="share" onClick={async () => await createImage(id)}>
                <IosShareIcon />
            </IconButton>
    ) : null
}