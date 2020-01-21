# Next.js Starter

[![Build Status](https://travis-ci.org/rwieruch/nextjs-firebase-authentication.svg?branch=master)](https://travis-ci.org/rwieruch/nextjs-firebase-authentication) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/nextjs-firebase-authentication.svg)](https://greenkeeper.io/)

- [Demo](https://courses.robinwieruch.de/)

**Server-Side User Authentication and Management with**

- GraphQL ([Tutorial](https://www.robinwieruch.de/graphql-apollo-server-tutorial)) and Firebase ([Tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial))
  - Sign In
  - Sign Up
  - Sign Out
  - Password Change
  - Password Reset

**Client and Server-Side Protected Routes with**

- [Next.js](https://nextjs.org/) and [Firebase](https://firebase.google.com/)

**Styling with**

- [Ant Design](https://ant.design/)
- [Styled Components](https://www.styled-components.com/) ([Tutorial](https://www.robinwieruch.de/react-styled-components))
- Page Transitions

**Type Support with**

- [TypeScript](https://www.typescriptlang.org/)

**Tested Code Base with**

- [Jest](https://jestjs.io/) ([Tutorial](https://www.robinwieruch.de/react-testing-jest))
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- [Apollo Mocks](https://www.apollographql.com/docs/react/development-testing/testing/)

**Environment Variables with**

- [Dotenv](https://github.com/motdotla/dotenv)

**Absolute Imports with**

- Babel Module Resolver ([Tutorial](https://www.robinwieruch.de/babel-module-resolver/))

## Installation

- `git clone git@github.com:rwieruch/nextjs-firebase-authentication.git`
- `cd nextjs-firebase-authentication`
- See: "**Use your own Firebase Credentials**"
- `npm install`
- `npm run dev`
- Visit http://localhost:3000/

### Use your own Firebase Credentials

- Visit https://firebase.google.com/ and create a Firebase App
- Create a _.env_ file to store your Firebase Credentials like so:
  ```
  FIREBASE_API_KEY=apiKey
  FIREBASE_AUTH_DOMAIN=authDomain
  FIREBASE_DATABASE_URL=databaseURL
  FIREBASE_PROJECT_ID=projectID
  FIREBASE_STORAGE_BUCKET=storageBucket
  FIREBASE_MESSAGING_SENDER_ID=messagingSenderId
  FIREBASE_APP_ID=appId
  ```
- Activate Email/Password Sign-In Method in your Firebase App

- Visit https://firebase.google.com/docs/admin/setup/#initialize-sdk for Firebase Admin SDK and generate a _firebaseServiceAccountKey.json_ file from there which should be in your project's root folder.

**Important: It is advised to add _.env_ and _firebaseServiceAccountKey.json_ to your .gitignore**
