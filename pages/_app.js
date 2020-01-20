import React from 'react';
import NextApp from 'next/app';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { PageTransition } from 'next-page-transitions';

import Head from '@components/Head';
import Loader from '@components/Loader';
import withApollo from '@services/apollo/withApollo';
import SessionContext from '@context/session';
import * as ROUTES from '@constants/routes';

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

class MyApp extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const isServer = ctx.req || ctx.res;

    const { session } = nextCookie(ctx);

    // Redirect server/client-side if not authorized
    if (Component.isAuthorized && !Component.isAuthorized(session)) {
      if (isServer) {
        ctx?.res?.writeHead(302, { Location: ROUTES.SIGN_IN });
        ctx?.res?.end();
      } else {
        Router.push(ROUTES.SIGN_IN);
      }
      return {};
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, session };
  }

  render() {
    const {
      Component,
      pageProps,
      session,
      apollo,
      router,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <SessionContext.Provider value={session}>
          <ApolloProvider client={apollo}>
            <GlobalStyle />
            <Head />
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
              <Component {...pageProps} key={router.route} />
            </PageTransition>
          </ApolloProvider>
        </SessionContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
