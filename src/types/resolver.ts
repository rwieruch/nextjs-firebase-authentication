import { ServerResponse, ServerRequest } from '@typeDefs/server';
import { User } from '@typeDefs/user';

import { CourseConnector } from '@connectors/course';
import { PartnerConnector } from '@connectors/partner';

export type ResolverContext = {
  res: ServerResponse;
  req: ServerRequest;
  me?: User;
  courseConnector: CourseConnector;
  partnerConnector: PartnerConnector;
};
