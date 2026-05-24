import AWS from "aws-sdk";

// Configure AWS using environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create S3 instance (AWS SDK v2)
const s3 = new AWS.S3();

export default s3;