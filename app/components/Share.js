'use client'
import React from "react";
import {toJpeg} from 'html-to-image'
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from "@mui/material/IconButton";



export default function Share({ id, text, imageLoaded}) {
    function dataURLtoFile (dataUrl, filename) {
        let arr = dataUrl.split(","),
            mimeType = arr[0].match(/:(.*?);/)[1],
            decodedData = atob(arr[1]),
            lengthOfDecodedData = decodedData.length,
            u8array = new Uint8Array(lengthOfDecodedData);
        while (lengthOfDecodedData--) {
            u8array[lengthOfDecodedData] = decodedData.charCodeAt(lengthOfDecodedData);
        }
        return new File([u8array], filename, { type: mimeType })
    }

    function createImage (id) {
        if (typeof window !== "undefined") {
            const temp = document.getElementById(id)
            console.log('TEMP', temp)
            toJpeg(document.getElementById(id), {quality: 0.95}).then(
                (dataUrl) => {
                    const fileName = id.split('/').pop()
                    const file = dataURLtoFile(dataUrl, fileName)
                    shareFile(file, "Title", "text");
                }
            );
        }
    }
    // const createImage = () => {
    //     toJpeg(document.getElementById("thanku_poster"), { quality: 0.95 }).then(
    //         (dataUrl) => {
    //             setThanksCard(false);
    //             const file = dataURLtoFile(dataUrl, "thanku_poster.png");
    //             shareFile(file, "Title", "https://co-aid.in");
    //         }
    //     );
    // };

    const shareFile = (file, title, text) => {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator
                .share({
                    files: [file],
                    title,
                    text
                })
                .then(() => console.log("Share was successful."))
                .catch((error) => console.log("Sharing failed", error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }
    };

    return imageLoaded ? (
            <IconButton aria-label="share" onClick={() => createImage(id)}>
                <IosShareIcon />
            </IconButton>
    ) : null
}