/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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
};

export enum BundleId {
  Student = 'STUDENT',
  Intermediate = 'INTERMEDIATE',
  Professional = 'PROFESSIONAL'
}

export type Course = {
   __typename?: 'Course',
  header: Scalars['String'],
  courseId: CourseId,
  bundle: Bundle,
};

export enum CourseId {
  TheRoadToLearnReact = 'THE_ROAD_TO_LEARN_REACT',
  TamingTheState = 'TAMING_THE_STATE',
  TheRoadToGraphql = 'THE_ROAD_TO_GRAPHQL',
  TheRoadToReactWithFirebase = 'THE_ROAD_TO_REACT_WITH_FIREBASE'
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
  storefront?: Maybe<Storefront>,
};


export type QueryStorefrontArgs = {
  courseId?: Maybe<CourseId>,
  bundleId?: Maybe<BundleId>
};

export type SessionToken = {
   __typename?: 'SessionToken',
  sessionToken: Scalars['String'],
};

export type Storefront = {
   __typename?: 'Storefront',
  course: Course,
};

export type StripeId = {
   __typename?: 'StripeId',
  id: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  _?: Maybe<Scalars['Boolean']>,
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  uid: Scalars['String'],
};

export type CreateFreeCourseMutationVariables = {
  courseId: CourseId,
  bundleId: BundleId
};


export type CreateFreeCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createFreeCourse'>
);

export type CreateAdminCourseMutationVariables = {
  uid: Scalars['String'],
  courseId: CourseId,
  bundleId: BundleId
};


export type CreateAdminCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAdminCourse'>
);

export type GetStorefrontQueryVariables = {
  courseId?: Maybe<CourseId>,
  bundleId?: Maybe<BundleId>
};


export type GetStorefrontQuery = (
  { __typename?: 'Query' }
  & { storefront: Maybe<(
    { __typename?: 'Storefront' }
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'header' | 'courseId'>
      & { bundle: (
        { __typename?: 'Bundle' }
        & Pick<Bundle, 'header' | 'bundleId' | 'price'>
      ) }
    ) }
  )> }
);

export type GetMeQueryVariables = {};


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);


export const CreateFreeCourseDocument = gql`
    mutation CreateFreeCourse($courseId: CourseId!, $bundleId: BundleId!) {
  createFreeCourse(courseId: $courseId, bundleId: $bundleId)
}
    `;
export type CreateFreeCourseMutationFn = ApolloReactCommon.MutationFunction<CreateFreeCourseMutation, CreateFreeCourseMutationVariables>;

/**
 * __useCreateFreeCourseMutation__
 *
 * To run a mutation, you first call `useCreateFreeCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFreeCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFreeCourseMutation, { data, loading, error }] = useCreateFreeCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      bundleId: // value for 'bundleId'
 *   },
 * });
 */
export function useCreateFreeCourseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFreeCourseMutation, CreateFreeCourseMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFreeCourseMutation, CreateFreeCourseMutationVariables>(CreateFreeCourseDocument, baseOptions);
      }
export type CreateFreeCourseMutationHookResult = ReturnType<typeof useCreateFreeCourseMutation>;
export type CreateFreeCourseMutationResult = ApolloReactCommon.MutationResult<CreateFreeCourseMutation>;
export type CreateFreeCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFreeCourseMutation, CreateFreeCourseMutationVariables>;
export const CreateAdminCourseDocument = gql`
    mutation CreateAdminCourse($uid: String!, $courseId: CourseId!, $bundleId: BundleId!) {
  createAdminCourse(uid: $uid, courseId: $courseId, bundleId: $bundleId)
}
    `;
export type CreateAdminCourseMutationFn = ApolloReactCommon.MutationFunction<CreateAdminCourseMutation, CreateAdminCourseMutationVariables>;

/**
 * __useCreateAdminCourseMutation__
 *
 * To run a mutation, you first call `useCreateAdminCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminCourseMutation, { data, loading, error }] = useCreateAdminCourseMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      courseId: // value for 'courseId'
 *      bundleId: // value for 'bundleId'
 *   },
 * });
 */
export function useCreateAdminCourseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAdminCourseMutation, CreateAdminCourseMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAdminCourseMutation, CreateAdminCourseMutationVariables>(CreateAdminCourseDocument, baseOptions);
      }
export type CreateAdminCourseMutationHookResult = ReturnType<typeof useCreateAdminCourseMutation>;
export type CreateAdminCourseMutationResult = ApolloReactCommon.MutationResult<CreateAdminCourseMutation>;
export type CreateAdminCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAdminCourseMutation, CreateAdminCourseMutationVariables>;
export const GetStorefrontDocument = gql`
    query GetStorefront($courseId: CourseId, $bundleId: BundleId) {
  storefront(courseId: $courseId, bundleId: $bundleId) {
    course {
      header
      courseId
      bundle {
        header
        bundleId
        price
      }
    }
  }
}
    `;

/**
 * __useGetStorefrontQuery__
 *
 * To run a query within a React component, call `useGetStorefrontQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStorefrontQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStorefrontQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      bundleId: // value for 'bundleId'
 *   },
 * });
 */
export function useGetStorefrontQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStorefrontQuery, GetStorefrontQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStorefrontQuery, GetStorefrontQueryVariables>(GetStorefrontDocument, baseOptions);
      }
export function useGetStorefrontLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStorefrontQuery, GetStorefrontQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStorefrontQuery, GetStorefrontQueryVariables>(GetStorefrontDocument, baseOptions);
        }
export type GetStorefrontQueryHookResult = ReturnType<typeof useGetStorefrontQuery>;
export type GetStorefrontLazyQueryHookResult = ReturnType<typeof useGetStorefrontLazyQuery>;
export type GetStorefrontQueryResult = ApolloReactCommon.QueryResult<GetStorefrontQuery, GetStorefrontQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    email
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;