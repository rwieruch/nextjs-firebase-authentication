import type { ServerResponse, ServerRequest } from '@typeDefs/server';
import type { User } from '@typeDefs/user';

import { AdminConnector } from '@connectors/admin';
import { CourseConnector } from '@connectors/course';
import { PartnerConnector } from '@connectors/partner';
import { CouponConnector } from '@connectors/coupon';

export type ResolverContext = {
  res: ServerResponse;
  req: ServerRequest;
  me?: User;
  adminConnector: AdminConnector;
  courseConnector: CourseConnector;
  partnerConnector: PartnerConnector;
  couponConnector: CouponConnector;
};
