require('@testing-library/jest-dom');

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

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
