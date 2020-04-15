import {
  ObjectType,
  Field,
  Ctx,
  Resolver,
  Query,
} from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';

@ObjectType()
class User {
  @Field()
  email: string;

  @Field()
  uid: string;

  @Field()
  username: string;

  @Field(type => [String])
  roles: string[];
}

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async me(@Ctx() ctx: ResolverContext) {
    const rolesObject = ctx.me?.customClaims || {};
    const roles = Object.keys(rolesObject).filter(
      key => rolesObject[key]
    );

    return {
      email: ctx.me?.email,
      uid: ctx.me?.uid,
      username: ctx.me?.displayName,
      roles,
    };
  }
}
