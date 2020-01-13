import React from 'react';

import { Session } from '@typeDefs/session';

const SessionContext = React.createContext({
  authUser: null,
  isSessionChecked: false,
} as Session);

export default SessionContext;
