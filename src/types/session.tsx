import { AuthUser } from '@typeDefs/authUser';

export type Session = {
  authUser: AuthUser | null;
  isSessionChecked: boolean;
};
