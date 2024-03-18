import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import getParameter from "@/lib/ssm/getParameter";

const client_s3 = new S3()

export default async function getImageUrl(image_id){
    try {
        const fileParams = {
            Bucket: await getParameter('bucket_name'),
            Key: image_id,
            expiresIn: 60 * 15, // 15 minutes
        }
        return await getSignedUrl(client_s3, new GetObjectCommand(fileParams));
    } catch (error) {
        console.log('Error getting S3 url')
        return null
    }
}