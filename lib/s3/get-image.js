import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";

const client_s3 = new S3({
    region: process.env.AWS_REGION,

    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

export default async function getImageUrl(image_id){
    try {
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: image_id,
            Expires: 600,
        }
        return await getSignedUrl(client_s3, new GetObjectCommand(fileParams));
    } catch (error) {
        console.log('Error getting S3 url')
        return null
    }
}