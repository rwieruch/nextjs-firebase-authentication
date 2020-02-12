import { QueryResolvers } from '@generated/server';
import s3, { bucket } from '@services/aws/s3';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    book: async (parent, { path, fileName }) => {
      const data = await s3
        .getObject({
          Bucket: bucket,
          Key: path,
        })
        .promise();

      return {
        fileName,
        contentType: data.ContentType,
        body: data?.Body?.toString('base64'),
      };
    },
  },
};
