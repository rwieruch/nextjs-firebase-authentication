import { GraphQLResolveInfo } from 'graphql';
import { ResolverContext } from '@typeDefs/resolver';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Bundle = {
   __typename?: 'Bundle',
  header: Scalars['String'],
  bundleId: BundleId,
  price: Scalars['Int'],
  imageUrl: Scalars['String'],
};

export enum BundleId {
  Student = 'STUDENT',
  Intermediate = 'INTERMEDIATE',
  Professional = 'PROFESSIONAL'
}

export enum CourseId {
  TheRoadToLearnReact = 'THE_ROAD_TO_LEARN_REACT',
  TamingTheState = 'TAMING_THE_STATE',
  TheRoadToGraphql = 'THE_ROAD_TO_GRAPHQL',
  TheRoadToReactWithFirebase = 'THE_ROAD_TO_REACT_WITH_FIREBASE'
}

export type File = {
   __typename?: 'File',
  fileName: Scalars['String'],
  contentType: Scalars['String'],
  body: Scalars['String'],
};

export enum Kind {
  Introduction = 'Introduction',
  Onboarding = 'Onboarding',
  BookDownload = 'BookDownload',
  BookOnline = 'BookOnline',
  Article = 'Article',
  Video = 'Video'
}

export type Mutation = {
   __typename?: 'Mutation',
  _?: Maybe<Scalars['Boolean']>,
  signIn: SessionToken,
  signUp: SessionToken,
  passwordForgot?: Maybe<Scalars['Boolean']>,
  passwordChange?: Maybe<Scalars['Boolean']>,
  paypalCreateOrder: OrderId,
  paypalApproveOrder?: Maybe<Scalars['Boolean']>,
  stripeCreateOrder: StripeId,
  createFreeCourse: Scalars['Boolean'],
  createAdminCourse: Scalars['Boolean'],
};


export type MutationSignInArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignUpArgs = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationPasswordForgotArgs = {
  email: Scalars['String']
};


export type MutationPasswordChangeArgs = {
  password: Scalars['String']
};


export type MutationPaypalCreateOrderArgs = {
  courseId: CourseId,
  bundleId: BundleId,
  coupon?: Maybe<Scalars['String']>
};


export type MutationPaypalApproveOrderArgs = {
  orderId: Scalars['String']
};


export type MutationStripeCreateOrderArgs = {
  imageUrl: Scalars['String'],
  courseId: CourseId,
  bundleId: BundleId,
  coupon?: Maybe<Scalars['String']>
};


export type MutationCreateFreeCourseArgs = {
  courseId: CourseId,
  bundleId: BundleId
};


export type MutationCreateAdminCourseArgs = {
  uid: Scalars['String'],
  courseId: CourseId,
  bundleId: BundleId
};

export type OrderId = {
   __typename?: 'OrderId',
  orderId: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['Boolean']>,
  me?: Maybe<User>,
  storefrontCourse?: Maybe<StorefrontCourse>,
  storefrontCourses: Array<StorefrontCourse>,
  unlockedCourses: Array<UnlockedCourse>,
  unlockedCourse?: Maybe<UnlockedCourse>,
  book: File,
};


export type QueryStorefrontCourseArgs = {
  courseId: CourseId,
  bundleId: BundleId
};


export type QueryUnlockedCourseArgs = {
  courseId: CourseId
};


export type QueryBookArgs = {
  path: Scalars['String'],
  fileName: Scalars['String']
};

export type SessionToken = {
   __typename?: 'SessionToken',
  sessionToken: Scalars['String'],
};

export type StorefrontCourse = {
   __typename?: 'StorefrontCourse',
  header: Scalars['String'],
  courseId: CourseId,
  url: Scalars['String'],
  imageUrl?: Maybe<Scalars['String']>,
  bundle: Bundle,
};

export type StripeId = {
   __typename?: 'StripeId',
  id: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  _?: Maybe<Scalars['Boolean']>,
};

export type UnlockedCourse = {
   __typename?: 'UnlockedCourse',
  courseId: CourseId,
  bundleId: BundleId,
  header: Scalars['String'],
  url: Scalars['String'],
  imageUrl: Scalars['String'],
  sections: Array<UnlockedCourseSection>,
};

export type UnlockedCourseItem = {
   __typename?: 'UnlockedCourseItem',
  kind: Kind,
  label: Scalars['String'],
  description: Scalars['String'],
  url: Scalars['String'],
  fileName?: Maybe<Scalars['String']>,
  secondaryUrl?: Maybe<Scalars['String']>,
};

export type UnlockedCourseSection = {
   __typename?: 'UnlockedCourseSection',
  label: Scalars['String'],
  items: Array<UnlockedCourseItem>,
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  uid: Scalars['String'],
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<any>,
  User: ResolverTypeWrapper<any>,
  String: ResolverTypeWrapper<any>,
  CourseId: ResolverTypeWrapper<any>,
  BundleId: ResolverTypeWrapper<any>,
  StorefrontCourse: ResolverTypeWrapper<any>,
  Bundle: ResolverTypeWrapper<any>,
  Int: ResolverTypeWrapper<any>,
  UnlockedCourse: ResolverTypeWrapper<any>,
  UnlockedCourseSection: ResolverTypeWrapper<any>,
  UnlockedCourseItem: ResolverTypeWrapper<any>,
  Kind: ResolverTypeWrapper<any>,
  File: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
  SessionToken: ResolverTypeWrapper<any>,
  OrderId: ResolverTypeWrapper<any>,
  StripeId: ResolverTypeWrapper<any>,
  Subscription: ResolverTypeWrapper<{}>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Boolean: any,
  User: any,
  String: any,
  CourseId: any,
  BundleId: any,
  StorefrontCourse: any,
  Bundle: any,
  Int: any,
  UnlockedCourse: any,
  UnlockedCourseSection: any,
  UnlockedCourseItem: any,
  Kind: any,
  File: any,
  Mutation: {},
  SessionToken: any,
  OrderId: any,
  StripeId: any,
  Subscription: {},
}>;

export type BundleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Bundle'] = ResolversParentTypes['Bundle']> = ResolversObject<{
  header?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  bundleId?: Resolver<ResolversTypes['BundleId'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type FileResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  signIn?: Resolver<ResolversTypes['SessionToken'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>,
  signUp?: Resolver<ResolversTypes['SessionToken'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'username' | 'email' | 'password'>>,
  passwordForgot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPasswordForgotArgs, 'email'>>,
  passwordChange?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPasswordChangeArgs, 'password'>>,
  paypalCreateOrder?: Resolver<ResolversTypes['OrderId'], ParentType, ContextType, RequireFields<MutationPaypalCreateOrderArgs, 'courseId' | 'bundleId'>>,
  paypalApproveOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPaypalApproveOrderArgs, 'orderId'>>,
  stripeCreateOrder?: Resolver<ResolversTypes['StripeId'], ParentType, ContextType, RequireFields<MutationStripeCreateOrderArgs, 'imageUrl' | 'courseId' | 'bundleId'>>,
  createFreeCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateFreeCourseArgs, 'courseId' | 'bundleId'>>,
  createAdminCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateAdminCourseArgs, 'uid' | 'courseId' | 'bundleId'>>,
}>;

export type OrderIdResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OrderId'] = ResolversParentTypes['OrderId']> = ResolversObject<{
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  storefrontCourse?: Resolver<Maybe<ResolversTypes['StorefrontCourse']>, ParentType, ContextType, RequireFields<QueryStorefrontCourseArgs, 'courseId' | 'bundleId'>>,
  storefrontCourses?: Resolver<Array<ResolversTypes['StorefrontCourse']>, ParentType, ContextType>,
  unlockedCourses?: Resolver<Array<ResolversTypes['UnlockedCourse']>, ParentType, ContextType>,
  unlockedCourse?: Resolver<Maybe<ResolversTypes['UnlockedCourse']>, ParentType, ContextType, RequireFields<QueryUnlockedCourseArgs, 'courseId'>>,
  book?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<QueryBookArgs, 'path' | 'fileName'>>,
}>;

export type SessionTokenResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SessionToken'] = ResolversParentTypes['SessionToken']> = ResolversObject<{
  sessionToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type StorefrontCourseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['StorefrontCourse'] = ResolversParentTypes['StorefrontCourse']> = ResolversObject<{
  header?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  courseId?: Resolver<ResolversTypes['CourseId'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bundle?: Resolver<ResolversTypes['Bundle'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type StripeIdResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['StripeId'] = ResolversParentTypes['StripeId']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type SubscriptionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>,
}>;

export type UnlockedCourseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnlockedCourse'] = ResolversParentTypes['UnlockedCourse']> = ResolversObject<{
  courseId?: Resolver<ResolversTypes['CourseId'], ParentType, ContextType>,
  bundleId?: Resolver<ResolversTypes['BundleId'], ParentType, ContextType>,
  header?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sections?: Resolver<Array<ResolversTypes['UnlockedCourseSection']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type UnlockedCourseItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnlockedCourseItem'] = ResolversParentTypes['UnlockedCourseItem']> = ResolversObject<{
  kind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType>,
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  secondaryUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type UnlockedCourseSectionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UnlockedCourseSection'] = ResolversParentTypes['UnlockedCourseSection']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['UnlockedCourseItem']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Bundle?: BundleResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  OrderId?: OrderIdResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SessionToken?: SessionTokenResolvers<ContextType>,
  StorefrontCourse?: StorefrontCourseResolvers<ContextType>,
  StripeId?: StripeIdResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  UnlockedCourse?: UnlockedCourseResolvers<ContextType>,
  UnlockedCourseItem?: UnlockedCourseItemResolvers<ContextType>,
  UnlockedCourseSection?: UnlockedCourseSectionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
