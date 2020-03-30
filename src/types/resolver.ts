import { Repository, Connection } from 'typeorm';

import { ServerResponse, ServerRequest } from '@typeDefs/server';
import { Me } from '@typeDefs/me';
import { Course } from '@models/course';
import { PartnerVisitor } from '@models/partner';

export type ResolverContext = {
  res: ServerResponse;
  req: ServerRequest;
  me?: Me;
  courseRepository: Repository<Course>;
  partnerVisitorRepository: Repository<PartnerVisitor>;
};
