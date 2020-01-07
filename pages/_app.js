// https://github.com/zeit/next.js/blob/canary/examples/with-next-page-transitions/pages/_app.js

import React from 'react';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { PageTransition } from 'next-page-transitions';

import Loader from '@components/Loader';
import { auth } from '@services/firebase/firebase';
import SessionContext from '@context/session';

const TIMEOUT = 400;

const theme = {
  colors: {
    primary: '#823eb7',
    lightGrey: '#f3f3f3',
  },
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;

    font-size: 16px;
    letter-spacing: -0.003em;
    line-height: 1.58;
  }

  .page-transition-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  .page-transition-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${TIMEOUT}ms;
  }

  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }

  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${TIMEOUT}ms;
  }
`;

const useAuthentication = () => {
  const [session, setSession] = React.useState({
    authUser: null,
    isSessionChecked: false,
  });

  React.useEffect(() => {
    let onAuthStateListener = auth.onAuthStateChanged(authUser => {
      authUser
        ? setSession({ authUser, isSessionChecked: true })
        : setSession({ authUser: null, isSessionChecked: true });
    });

    return () => onAuthStateListener();
  }, []);

  return session;
};

const MyComponent = ({ children }) => {
  const router = useRouter();
  const session = useAuthentication();

  return (
    <ThemeProvider theme={theme}>
      <SessionContext.Provider value={session}>
        <GlobalStyle />
        <PageTransition
          timeout={TIMEOUT}
          classNames="page-transition"
          loadingClassNames="loading-indicator"
          loadingComponent={<Loader />}
          loadingDelay={500}
          loadingTimeout={{
            enter: TIMEOUT,
            exit: 0,
          }}
        >
          {React.cloneElement(children, { key: router.route })}
        </PageTransition>
      </SessionContext.Provider>
    </ThemeProvider>
  );
};

export default class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <MyComponent>
        <Component {...pageProps} />
      </MyComponent>
    );
  }
}
