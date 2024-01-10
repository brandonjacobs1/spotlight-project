import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import getParameter from "@/lib/ssm/getParameter";

export default async function getUploadUrl(filePath) {
    const client_s3 = new S3()

    const fileParams = {
        Bucket: await getParameter('bucket_name'),
        Key: filePath,
        expiresIn: 60
    }
    try {
        return await getSignedUrl(client_s3, new PutObjectCommand(fileParams))
    }catch (e) {
        console.log('Error getting s3 upload url')
    }
}