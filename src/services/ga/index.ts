import ReactGA from 'react-ga';

export const initGA = () => {
  console.log(process.env.GOOGLE_ANALYTICS);
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS || '');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
