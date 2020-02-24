require('@testing-library/jest-dom');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Firebase Client

jest.mock('firebase/app', () => ({
  __esModule: true,
  default: {
    initializeApp: jest.fn(),
    apps: [],
    auth: jest.fn(() => ({
      setPersistence: jest.fn(),
      signInWithEmailAndPassword: jest.fn(() => ({
        user: {
          getIdToken: jest.fn(() => '1'),
        },
      })),
      signOut: jest.fn(),
    })),
  },
}));

jest.mock('firebase/auth');

// Firebase Admin

jest.mock('firebase-admin', () => {
  return {
    database: {
      ServerValue: {
        TIMESTAMP: 'TIMESTAMP',
      },
    },
  };
});

jest.mock('@services/firebase/admin', () => {
  const set = jest.fn();
  const push = jest.fn(() => ({
    set,
  }));
  const ref = jest.fn(() => ({
    push,
  }));

  return {
    database: jest.fn(() => ({
      ref,
    })),
  };
});

// AWS

jest.mock('@services/aws/s3', () => {
  const promise = jest.fn(() =>
    Promise.resolve({
      ContentType: 'application/json',
      Body: 'Body',
    })
  );

  return {
    getObject: jest.fn(() => ({
      promise,
    })),
  };
});
