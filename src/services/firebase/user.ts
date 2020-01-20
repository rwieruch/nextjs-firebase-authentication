import { db } from './firebase';

export const doCreateUser = (
  id: string,
  username: string,
  email: string
) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });
