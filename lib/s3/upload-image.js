import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export default async function getUploadUrl(filePath) {
    const client_s3 = new S3({
        region: process.env.AWS_REGION,

        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    })

    const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        expiresIn: 60
    }
    try {
        return await getSignedUrl(client_s3, new PutObjectCommand(fileParams))
    }catch (e) {
        console.log('Error getting s3 upload url')
    }
}