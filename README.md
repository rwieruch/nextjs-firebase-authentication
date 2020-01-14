# Next.js Starter with User Authentication/Authorization

[![Build Status](https://travis-ci.org/rwieruch/nextjs-firebase-authentication.svg?branch=master)](https://travis-ci.org/rwieruch/nextjs-firebase-authentication) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/nextjs-firebase-authentication.svg)](https://greenkeeper.io/)

- [Demo](https://courses.robinwieruch.de/)

**User Management with**

- Firebase ([Tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial))
  - Sign In
  - Sign Up
  - Sign Out
  - Password Change
  - Password Reset

**Protected Routes with**

- NextJs and Firebase

**Styling with**

- Ant Design
- Styled Components
- Page Transitions

**Type Support with**

- TypeScript

**Tested Code Base with**

- Jest
- React Testing Library

**Environment Variables with**

- Dotenv

**Absolute Imports with**

- Babel Module Resolver ([Tutorial](https://www.robinwieruch.de/babel-module-resolver/))

## Installation

- `git clone git@github.com:rwieruch/nextjs-firebase-authentication.git`
- `cd nextjs-firebase-authentication`
- see: "Use your own Firebase Credentials"
- `npm install`
- `npm test`
- `npm run dev`
- visit http://localhost:3000/

### Use your own Firebase Credentials

- visit https://firebase.google.com/ and create a Firebase App
- copy and paste your Credentials from your Firebase App into _src/services/firebase/firebase.tsx_
- activate Email/Password Sign-In Method in your Firebase App
