import React from 'react';

const SessionContext = React.createContext({
  authUser: null,
  isSessionChecked: false,
});

export default SessionContext;
