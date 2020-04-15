import s3, { bucket } from '@services/aws/s3';

import {
  ObjectType,
  Field,
  Arg,
  Resolver,
  Query,
} from 'type-graphql';

@ObjectType()
class File {
  @Field()
  fileName: string;

  @Field()
  contentType: string;

  @Field()
  body: string;
}

@ObjectType()
class Markdown {
  @Field()
  body: string;
}

@Resolver()
export default class BookResolver {
  @Query(() => File)
  async book(
    @Arg('path') path: string,
    @Arg('fileName') fileName: string
  ) {
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
  }

  @Query(() => Markdown)
  async onlineChapter(@Arg('path') path: string) {
    const data = await s3
      .getObject({
        Bucket: bucket,
        Key: path,
      })
      .promise();

    return {
      body: data?.Body?.toString('base64'),
    };
  }
}
