import AWS from 'aws-sdk';

export const bucket = process.env.S3_BUCKET || '';

export default new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.S3_ENDPOINT),
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});
