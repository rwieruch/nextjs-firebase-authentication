import s3, { bucket } from '@services/aws/s3';

import {
  ObjectType,
  Field,
  Arg,
  Resolver,
  Query,
  UseMiddleware,
} from 'type-graphql';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';

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
  @UseMiddleware(isAuthenticated)
  async book(
    @Arg('path') path: string,
    @Arg('fileName') fileName: string
  ): Promise<File> {
    const { ContentType, Body } = await s3
      .getObject({
        Bucket: bucket,
        Key: path,
      })
      .promise();

    if (!ContentType || !Body) {
      throw new Error("Book couldn't get downloaded.");
    }

    return {
      fileName,
      contentType: ContentType,
      body: Body.toString('base64'),
    };
  }

  @Query(() => Markdown)
  @UseMiddleware(isAuthenticated)
  async onlineChapter(@Arg('path') path: string): Promise<Markdown> {
    const { Body } = await s3
      .getObject({
        Bucket: bucket,
        Key: path,
      })
      .promise();

    if (!Body) {
      throw new Error("Chapter couldn't get downloaded.");
    }

    return {
      body: Body.toString('base64'),
    };
  }
}
