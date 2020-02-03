import { ServerResponse, ServerRequest } from '@typeDefs/server';
import { Me } from '@typeDefs/me';

export type ResolverContext = {
  res: ServerResponse;
  req: ServerRequest;
  me?: Me;
};
