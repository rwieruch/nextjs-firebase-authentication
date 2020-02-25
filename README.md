# Next.js Starter

[![Build Status](https://travis-ci.org/rwieruch/nextjs-firebase-authentication.svg?branch=master)](https://travis-ci.org/rwieruch/nextjs-firebase-authentication) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/nextjs-firebase-authentication.svg)](https://greenkeeper.io/)

- [Demo](https://courses.robinwieruch.de/)

**Server-Side User Management with**

- GraphQL ([Tutorial](https://www.robinwieruch.de/graphql-apollo-server-tutorial)) and Firebase ([Tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial))
  - Sign In
  - Sign Up
  - Sign Out
  - Password Change
  - Password Reset

**Client and Server-Side Protected Routes with**

- Next.js Authorization and Firebase Session

**Payment with**

- Stripe
- PayPal

**Styling with**

- [Ant Design](https://ant.design/)
- Styled Components ([Tutorial](https://www.robinwieruch.de/react-styled-components))
- Page Transitions

**Type Support with**

- TypeScript

**Tested Code Base with**

- [Jest](https://jestjs.io/) ([Tutorial](https://www.robinwieruch.de/react-testing-jest))
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- [Apollo Mocks](https://www.apollographql.com/docs/react/development-testing/testing/)

**Environment Variables with**

- [Dotenv](https://github.com/motdotla/dotenv)

**Absolute Imports with**

- Babel Module Resolver ([Tutorial](https://www.robinwieruch.de/babel-module-resolver/))

**Sentry**

## Installation

- `git clone git@github.com:rwieruch/nextjs-firebase-authentication.git`
- `cd nextjs-firebase-authentication`
- See other installation instructions below ...
- `npm install`
- `npm run dev`
- Visit http://localhost:3000/

### .env file

Create a _.env_ file. If using git, add it to your _.gitignore_ file.

Values may differ for development and production:

```
BASE_URL=http://localhost:3000

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

STRIPE_CLIENT_ID=
STRIPE_CLIENT_SECRET=
STRIPE_WEBHOOK_SECRET=

COUPON_SALT=
COUPON_URL=
FIREBASE_ADMIN_UID=

SENTRY_DSN=

REVUE_TOKEN=

SLACK_TOKEN=

CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=

S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=
```

- [FIREBASE](https://firebase.google.com/)
  - Activate Email/Password Sign-In Method for your Firebase Project
- [PAYPAL](https://developer.paypal.com/)
  - [Checkout](https://developer.paypal.com/docs/checkout/)
- [STRIPE](https://stripe.com/)
  - [Checkout](https://stripe.com/docs/payments/checkout/one-time)
  - [Webhook](https://stripe.com/docs/payments/checkout/fulfillment#webhooks)

### .firebaseServiceAccountKey.json file

Visit [here](https://firebase.google.com/docs/admin/setup/#initialize-sdk) for Firebase Admin SDK and generate a _firebaseServiceAccountKey.json_ file from there which should be in your project's root folder. If using git, add it to your _.gitignore_ file.

### Admin Account

If you want to have an account with Firebase admin claims, create this Firebase account first via UI, then set the user account's `uid` in _.env_ with `FIREBASE_ADMIN_UID`, and restart your server.

### Stripe CLI for Webhook in Development Mode

[Stripe CLI](https://stripe.com/docs/stripe-cli)

```
stripe login
# follow instructions
stripe listen --forward-to localhost:3000/api/stripe-webhook
# copy and paste secret
```

The `secret` can be used in _.env_:

```
STRIPE_WEBHOOK_SECRET=secret
```

Then fake a request with Stripe CLI `stripe payment_intents create --amount=100 --currency=usd` will work. Make sure the application is running too. Or use the web application's Stripe Checkout feature for real.
