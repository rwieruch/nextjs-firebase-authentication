import App from 'next/app';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
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
`;

export default ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);
