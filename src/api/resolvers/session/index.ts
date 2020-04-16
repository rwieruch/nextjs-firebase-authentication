import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Mutation,
  UseMiddleware,
} from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';
import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';
import { inviteToRevue } from '@services/revue';
import { inviteToConvertkit } from '@services/convertkit';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';

@ObjectType()
class SessionToken {
  @Field()
  token: string;
}

@Resolver()
export default class SessionResolver {
  @Mutation(() => SessionToken)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<SessionToken> {
    let result;

    try {
      result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error);
    }

    if (!result.user) {
      throw new Error('No user found.');
    }

    const idToken = await result.user.getIdToken();

    const token = await firebaseAdmin
      .auth()
      .createSessionCookie(idToken, {
        expiresIn: EXPIRES_IN,
      });

    if (!token) {
      throw new Error('Not able to create a session cookie.');
    }

    // We manage the session ourselves.
    await firebase.auth().signOut();

    return { token };
  }

  @Mutation(() => SessionToken)
  async signUp(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<SessionToken> {
    try {
      await firebaseAdmin.auth().createUser({
        email,
        password,
        displayName: username,
      });
    } catch (error) {
      throw new Error(error);
    }

    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (!user) {
      throw new Error('No user found.');
    }

    const idToken = await user.getIdToken();

    const token = await firebaseAdmin
      .auth()
      .createSessionCookie(idToken, {
        expiresIn: EXPIRES_IN,
      });

    // We manage the session ourselves.
    await firebase.auth().signOut();

    try {
      inviteToConvertkit(email, username);
    } catch (error) {
      console.log(error);
    }

    try {
      inviteToRevue(email, username);
    } catch (error) {
      console.log(error);
    }

    return { token };
  }

  @Mutation(() => Boolean)
  async passwordForgot(
    @Arg('email') email: string
  ): Promise<Boolean> {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async passwordChange(
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<Boolean> {
    try {
      await firebaseAdmin.auth().updateUser(ctx.me!.uid, {
        password,
      });
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async emailChange(
    @Arg('email') email: string,
    @Ctx() ctx: ResolverContext
  ): Promise<Boolean> {
    try {
      await firebaseAdmin.auth().updateUser(ctx.me!.uid, {
        email,
      });
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }
}
