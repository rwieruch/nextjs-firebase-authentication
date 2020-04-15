import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Mutation,
} from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';
import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';
import { inviteToRevue } from '@services/revue';
import { inviteToConvertkit } from '@services/convertkit';

@ObjectType()
class SessionToken {
  @Field()
  sessionToken: string;
}

@Resolver()
export default class SessionResolver {
  @Mutation(() => SessionToken)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    let result;

    try {
      result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      return new Error(error);
    }

    const idToken = await result.user?.getIdToken();
    const sessionToken = await firebaseAdmin
      .auth()
      .createSessionCookie(idToken || '', {
        expiresIn: EXPIRES_IN,
      });

    // We manage the session ourselves.
    await firebase.auth().signOut();

    return { sessionToken };
  }

  @Mutation(() => SessionToken)
  async signUp(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    try {
      await firebaseAdmin.auth().createUser({
        email,
        password,
        displayName: username,
      });
    } catch (error) {
      if (error.message.includes('email address is already in use')) {
        return new Error(
          'You already registered with this email. Hint: Check your password manager for our old domain: roadtoreact.com'
        );
      } else {
        return new Error(error);
      }
    }

    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const idToken = await user?.getIdToken();
    const sessionToken = await firebaseAdmin
      .auth()
      .createSessionCookie(idToken || '', {
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

    return { sessionToken };
  }

  @Mutation(() => Boolean, { nullable: true })
  async passwordForgot(@Arg('email') email: string) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      return new Error(error);
    }

    return true;
  }

  @Mutation(() => Boolean, { nullable: true })
  async passwordChange(
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ) {
    try {
      await firebaseAdmin.auth().updateUser(ctx.me?.uid || '', {
        password,
      });
    } catch (error) {
      return new Error(error);
    }

    return true;
  }

  @Mutation(() => Boolean, { nullable: true })
  async emailChange(
    @Arg('email') email: string,
    @Ctx() ctx: ResolverContext
  ) {
    try {
      await firebaseAdmin.auth().updateUser(ctx.me?.uid || '', {
        email,
      });
    } catch (error) {
      return new Error(error);
    }

    return true;
  }
}
