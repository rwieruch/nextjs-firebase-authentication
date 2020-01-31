import { Claims } from './claims';

export type Me = {
  uid: string;
  email: string;
  claims: Claims;
};
