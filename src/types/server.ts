import {
  ServerResponse as ServerResponseBase,
  ServerRequest as ServerRequestBase,
} from 'microrouter';

export interface ServerRequest extends ServerRequestBase {
  cookies: { [key: string]: string };
}

export interface ServerResponse extends ServerResponseBase {}
