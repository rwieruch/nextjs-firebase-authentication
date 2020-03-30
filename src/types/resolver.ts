import { ServerResponse, ServerRequest } from '@typeDefs/server';
import { Me } from '@typeDefs/me';

import { CourseConnector } from '@connectors/course';
import { PartnerConnector } from '@connectors/partner';

export type ResolverContext = {
  res: ServerResponse;
  req: ServerRequest;
  me?: Me;
  courseConnector: CourseConnector;
  partnerConnector: PartnerConnector;
};
