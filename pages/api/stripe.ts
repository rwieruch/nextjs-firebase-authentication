import { ServerRequest, ServerResponse } from '@typeDefs/server';

export default (req: ServerRequest, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'John Doe' }));
};
