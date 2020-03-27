import { GraphQLResolveInfo } from 'graphql';
import { ResolverContext } from '@typeDefs/resolver';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BookChapter = {
   __typename?: 'BookChapter';
  label: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<BookSection>>;
};

export type BookDownload = {
   __typename?: 'BookDownload';
  label: Scalars['String'];
  data?: Maybe<BookDownloadData>;
};

export type BookDownloadData = {
   __typename?: 'BookDownloadData';
  label: Scalars['String'];
  items: Array<BookDownloadItem>;
};

export type BookDownloadItem = {
   __typename?: 'BookDownloadItem';
  label: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  fileName: Scalars['String'];
};

export type BookOnline = {
   __typename?: 'BookOnline';
  label: Scalars['String'];
  data?: Maybe<BookOnlineData>;
};

export type BookOnlineData = {
   __typename?: 'BookOnlineData';
  chapters: Array<BookChapter>;
};

export type BookSection = {
   __typename?: 'BookSection';
  label: Scalars['String'];
  url: Scalars['String'];
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

export type Curriculum = {
   __typename?: 'Curriculum';
  label: Scalars['String'];
  data?: Maybe<CurriculumData>;
};

export type CurriculumData = {
   __typename?: 'CurriculumData';
  sections: Array<CurriculumSection>;
};

export type CurriculumItem = {
   __typename?: 'CurriculumItem';
  label: Scalars['String'];
  url: Scalars['String'];
  description: Scalars['String'];
  kind: Kind;
  secondaryUrl?: Maybe<Scalars['String']>;
};

export type CurriculumSection = {
   __typename?: 'CurriculumSection';
  label: Scalars['String'];
  items: Array<CurriculumItem>;
};

export type Discount = {
   __typename?: 'Discount';
  price: Scalars['Int'];
  isDiscount: Scalars['Boolean'];
};

export type File = {
   __typename?: 'File';
  fileName: Scalars['String'];
  contentType: Scalars['String'];
  body: Scalars['String'];
};

export type Introduction = {
   __typename?: 'Introduction';
  label: Scalars['String'];
  data?: Maybe<IntroductionData>;
};

export type IntroductionData = {
   __typename?: 'IntroductionData';
  label: Scalars['String'];
  url: Scalars['String'];
  description: Scalars['String'];
};

export enum Kind {
  Article = 'Article',
  Video = 'Video'
}

export type Markdown = {
   __typename?: 'Markdown';
  body: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  migrate?: Maybe<Scalars['Boolean']>;
  signIn: SessionToken;
  signUp: SessionToken;
  passwordForgot?: Maybe<Scalars['Boolean']>;
  passwordChange?: Maybe<Scalars['Boolean']>;
  emailChange?: Maybe<Scalars['Boolean']>;
  paypalCreateOrder: OrderId;
  paypalApproveOrder?: Maybe<Scalars['Boolean']>;
  stripeCreateOrder: StripeId;
  createFreeCourse: Scalars['Boolean'];
  createAdminCourse: Scalars['Boolean'];
  promoteToPartner?: Maybe<Scalars['Boolean']>;
};


export type MutationMigrateArgs = {
  migrationType: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPasswordForgotArgs = {
  email: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  password: Scalars['String'];
};


export type MutationEmailChangeArgs = {
  email: Scalars['String'];
};


export type MutationPaypalCreateOrderArgs = {
  courseId: CourseId;
  bundleId: BundleId;
  coupon?: Maybe<Scalars['String']>;
};


export type MutationPaypalApproveOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationStripeCreateOrderArgs = {
  imageUrl: Scalars['String'];
  courseId: CourseId;
  bundleId: BundleId;
  coupon?: Maybe<Scalars['String']>;
};


export type MutationCreateFreeCourseArgs = {
  courseId: CourseId;
  bundleId: BundleId;
};


export type MutationCreateAdminCourseArgs = {
  uid: Scalars['String'];
  courseId: CourseId;
  bundleId: BundleId;
};


export type MutationPromoteToPartnerArgs = {
  uid: Scalars['String'];
};

export type Onboarding = {
   __typename?: 'Onboarding';
  label: Scalars['String'];
  data?: Maybe<OnboardingData>;
};

export type OnboardingData = {
   __typename?: 'OnboardingData';
  items: Array<OnboardingItem>;
};

export type OnboardingItem = {
   __typename?: 'OnboardingItem';
  label: Scalars['String'];
  url: Scalars['String'];
  description: Scalars['String'];
  secondaryUrl?: Maybe<Scalars['String']>;
};

export type OrderId = {
   __typename?: 'OrderId';
  orderId: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  me?: Maybe<User>;
  storefrontCourse?: Maybe<StorefrontCourse>;
  storefrontCourses: Array<StorefrontCourse>;
  storefrontBundles: Array<StorefrontBundle>;
  unlockedCourses: Array<StorefrontCourse>;
  unlockedCourse?: Maybe<UnlockedCourse>;
  book: File;
  onlineChapter: Markdown;
  upgradeableCourses: Array<StorefrontCourse>;
  discountedPrice: Discount;
};


export type QueryStorefrontCourseArgs = {
  courseId: CourseId;
  bundleId: BundleId;
};


export type QueryStorefrontBundlesArgs = {
  courseId: CourseId;
};


export type QueryUnlockedCourseArgs = {
  courseId: CourseId;
};


export type QueryBookArgs = {
  path: Scalars['String'];
  fileName: Scalars['String'];
};


export type QueryOnlineChapterArgs = {
  path: Scalars['String'];
};


export type QueryUpgradeableCoursesArgs = {
  courseId: CourseId;
};


export type QueryDiscountedPriceArgs = {
  courseId: CourseId;
  bundleId: BundleId;
  coupon: Scalars['String'];
};

export type SessionToken = {
   __typename?: 'SessionToken';
  sessionToken: Scalars['String'];
};

export type StorefrontBundle = {
   __typename?: 'StorefrontBundle';
  header: Scalars['String'];
  bundleId: BundleId;
  price: Scalars['Int'];
  imageUrl: Scalars['String'];
  benefits: Array<Scalars['String']>;
};

export type StorefrontCourse = {
   __typename?: 'StorefrontCourse';
  header: Scalars['String'];
  courseId: CourseId;
  url: Scalars['String'];
  imageUrl: Scalars['String'];
  canUpgrade: Scalars['Boolean'];
  bundle: StorefrontBundle;
};

export type StripeId = {
   __typename?: 'StripeId';
  id: Scalars['String'];
};

export type Subscription = {
   __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type UnlockedCourse = {
   __typename?: 'UnlockedCourse';
  courseId: CourseId;
  bundleId: BundleId;
  header: Scalars['String'];
  url: Scalars['String'];
  imageUrl: Scalars['String'];
  canUpgrade: Scalars['Boolean'];
  introduction?: Maybe<Introduction>;
  onboarding?: Maybe<Onboarding>;
  bookDownload?: Maybe<BookDownload>;
  bookOnline?: Maybe<BookOnline>;
  curriculum?: Maybe<Curriculum>;
};

export type User = {
   __typename?: 'User';
  email: Scalars['String'];
  uid: Scalars['String'];
  username: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  StorefrontBundle: ResolverTypeWrapper<any>,
  Int: ResolverTypeWrapper<any>,
  UnlockedCourse: ResolverTypeWrapper<any>,
  Introduction: ResolverTypeWrapper<any>,
  IntroductionData: ResolverTypeWrapper<any>,
  Onboarding: ResolverTypeWrapper<any>,
  OnboardingData: ResolverTypeWrapper<any>,
  OnboardingItem: ResolverTypeWrapper<any>,
  BookDownload: ResolverTypeWrapper<any>,
  BookDownloadData: ResolverTypeWrapper<any>,
  BookDownloadItem: ResolverTypeWrapper<any>,
  BookOnline: ResolverTypeWrapper<any>,
  BookOnlineData: ResolverTypeWrapper<any>,
  BookChapter: ResolverTypeWrapper<any>,
  BookSection: ResolverTypeWrapper<any>,
  Curriculum: ResolverTypeWrapper<any>,
  CurriculumData: ResolverTypeWrapper<any>,
  CurriculumSection: ResolverTypeWrapper<any>,
  CurriculumItem: ResolverTypeWrapper<any>,
  Kind: ResolverTypeWrapper<any>,
  File: ResolverTypeWrapper<any>,
  Markdown: ResolverTypeWrapper<any>,
  Discount: ResolverTypeWrapper<any>,
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
  StorefrontBundle: any,
  Int: any,
  UnlockedCourse: any,
  Introduction: any,
  IntroductionData: any,
  Onboarding: any,
  OnboardingData: any,
  OnboardingItem: any,
  BookDownload: any,
  BookDownloadData: any,
  BookDownloadItem: any,
  BookOnline: any,
  BookOnlineData: any,
  BookChapter: any,
  BookSection: any,
  Curriculum: any,
  CurriculumData: any,
  CurriculumSection: any,
  CurriculumItem: any,
  Kind: any,
  File: any,
  Markdown: any,
  Discount: any,
  Mutation: {},
  SessionToken: any,
  OrderId: any,
  StripeId: any,
  Subscription: {},
}>;

export type BookChapterResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookChapter'] = ResolversParentTypes['BookChapter']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sections?: Resolver<Maybe<Array<ResolversTypes['BookSection']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookDownloadResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookDownload'] = ResolversParentTypes['BookDownload']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['BookDownloadData']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookDownloadDataResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookDownloadData'] = ResolversParentTypes['BookDownloadData']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['BookDownloadItem']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookDownloadItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookDownloadItem'] = ResolversParentTypes['BookDownloadItem']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookOnlineResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookOnline'] = ResolversParentTypes['BookOnline']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['BookOnlineData']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookOnlineDataResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookOnlineData'] = ResolversParentTypes['BookOnlineData']> = ResolversObject<{
  chapters?: Resolver<Array<ResolversTypes['BookChapter']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type BookSectionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['BookSection'] = ResolversParentTypes['BookSection']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurriculumResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Curriculum'] = ResolversParentTypes['Curriculum']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['CurriculumData']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurriculumDataResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CurriculumData'] = ResolversParentTypes['CurriculumData']> = ResolversObject<{
  sections?: Resolver<Array<ResolversTypes['CurriculumSection']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurriculumItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CurriculumItem'] = ResolversParentTypes['CurriculumItem']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  kind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType>,
  secondaryUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CurriculumSectionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CurriculumSection'] = ResolversParentTypes['CurriculumSection']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['CurriculumItem']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type DiscountResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Discount'] = ResolversParentTypes['Discount']> = ResolversObject<{
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  isDiscount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type FileResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type IntroductionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Introduction'] = ResolversParentTypes['Introduction']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['IntroductionData']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type IntroductionDataResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['IntroductionData'] = ResolversParentTypes['IntroductionData']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MarkdownResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Markdown'] = ResolversParentTypes['Markdown']> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  migrate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMigrateArgs, 'migrationType'>>,
  signIn?: Resolver<ResolversTypes['SessionToken'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>,
  signUp?: Resolver<ResolversTypes['SessionToken'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'username' | 'email' | 'password'>>,
  passwordForgot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPasswordForgotArgs, 'email'>>,
  passwordChange?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPasswordChangeArgs, 'password'>>,
  emailChange?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEmailChangeArgs, 'email'>>,
  paypalCreateOrder?: Resolver<ResolversTypes['OrderId'], ParentType, ContextType, RequireFields<MutationPaypalCreateOrderArgs, 'courseId' | 'bundleId'>>,
  paypalApproveOrder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPaypalApproveOrderArgs, 'orderId'>>,
  stripeCreateOrder?: Resolver<ResolversTypes['StripeId'], ParentType, ContextType, RequireFields<MutationStripeCreateOrderArgs, 'imageUrl' | 'courseId' | 'bundleId'>>,
  createFreeCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateFreeCourseArgs, 'courseId' | 'bundleId'>>,
  createAdminCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateAdminCourseArgs, 'uid' | 'courseId' | 'bundleId'>>,
  promoteToPartner?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPromoteToPartnerArgs, 'uid'>>,
}>;

export type OnboardingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Onboarding'] = ResolversParentTypes['Onboarding']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['OnboardingData']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type OnboardingDataResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OnboardingData'] = ResolversParentTypes['OnboardingData']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['OnboardingItem']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type OnboardingItemResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OnboardingItem'] = ResolversParentTypes['OnboardingItem']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  secondaryUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type OrderIdResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['OrderId'] = ResolversParentTypes['OrderId']> = ResolversObject<{
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  storefrontCourse?: Resolver<Maybe<ResolversTypes['StorefrontCourse']>, ParentType, ContextType, RequireFields<QueryStorefrontCourseArgs, 'courseId' | 'bundleId'>>,
  storefrontCourses?: Resolver<Array<ResolversTypes['StorefrontCourse']>, ParentType, ContextType>,
  storefrontBundles?: Resolver<Array<ResolversTypes['StorefrontBundle']>, ParentType, ContextType, RequireFields<QueryStorefrontBundlesArgs, 'courseId'>>,
  unlockedCourses?: Resolver<Array<ResolversTypes['StorefrontCourse']>, ParentType, ContextType>,
  unlockedCourse?: Resolver<Maybe<ResolversTypes['UnlockedCourse']>, ParentType, ContextType, RequireFields<QueryUnlockedCourseArgs, 'courseId'>>,
  book?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<QueryBookArgs, 'path' | 'fileName'>>,
  onlineChapter?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType, RequireFields<QueryOnlineChapterArgs, 'path'>>,
  upgradeableCourses?: Resolver<Array<ResolversTypes['StorefrontCourse']>, ParentType, ContextType, RequireFields<QueryUpgradeableCoursesArgs, 'courseId'>>,
  discountedPrice?: Resolver<ResolversTypes['Discount'], ParentType, ContextType, RequireFields<QueryDiscountedPriceArgs, 'courseId' | 'bundleId' | 'coupon'>>,
}>;

export type SessionTokenResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SessionToken'] = ResolversParentTypes['SessionToken']> = ResolversObject<{
  sessionToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type StorefrontBundleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['StorefrontBundle'] = ResolversParentTypes['StorefrontBundle']> = ResolversObject<{
  header?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  bundleId?: Resolver<ResolversTypes['BundleId'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  benefits?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type StorefrontCourseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['StorefrontCourse'] = ResolversParentTypes['StorefrontCourse']> = ResolversObject<{
  header?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  courseId?: Resolver<ResolversTypes['CourseId'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  canUpgrade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  bundle?: Resolver<ResolversTypes['StorefrontBundle'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type StripeIdResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['StripeId'] = ResolversParentTypes['StripeId']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  canUpgrade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  introduction?: Resolver<Maybe<ResolversTypes['Introduction']>, ParentType, ContextType>,
  onboarding?: Resolver<Maybe<ResolversTypes['Onboarding']>, ParentType, ContextType>,
  bookDownload?: Resolver<Maybe<ResolversTypes['BookDownload']>, ParentType, ContextType>,
  bookOnline?: Resolver<Maybe<ResolversTypes['BookOnline']>, ParentType, ContextType>,
  curriculum?: Resolver<Maybe<ResolversTypes['Curriculum']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  BookChapter?: BookChapterResolvers<ContextType>,
  BookDownload?: BookDownloadResolvers<ContextType>,
  BookDownloadData?: BookDownloadDataResolvers<ContextType>,
  BookDownloadItem?: BookDownloadItemResolvers<ContextType>,
  BookOnline?: BookOnlineResolvers<ContextType>,
  BookOnlineData?: BookOnlineDataResolvers<ContextType>,
  BookSection?: BookSectionResolvers<ContextType>,
  Curriculum?: CurriculumResolvers<ContextType>,
  CurriculumData?: CurriculumDataResolvers<ContextType>,
  CurriculumItem?: CurriculumItemResolvers<ContextType>,
  CurriculumSection?: CurriculumSectionResolvers<ContextType>,
  Discount?: DiscountResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Introduction?: IntroductionResolvers<ContextType>,
  IntroductionData?: IntroductionDataResolvers<ContextType>,
  Markdown?: MarkdownResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Onboarding?: OnboardingResolvers<ContextType>,
  OnboardingData?: OnboardingDataResolvers<ContextType>,
  OnboardingItem?: OnboardingItemResolvers<ContextType>,
  OrderId?: OrderIdResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SessionToken?: SessionTokenResolvers<ContextType>,
  StorefrontBundle?: StorefrontBundleResolvers<ContextType>,
  StorefrontCourse?: StorefrontCourseResolvers<ContextType>,
  StripeId?: StripeIdResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  UnlockedCourse?: UnlockedCourseResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
