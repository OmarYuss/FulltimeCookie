import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "application/json",
  // Add more as needed
];

export const generatePresignedUrl = async (key: string, type: string) => {
  if (!ALLOWED_MIME_TYPES.includes(type)) {
    throw new Error("Invalid MIME type");
  }
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ContentType: type,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 60 });
}; 