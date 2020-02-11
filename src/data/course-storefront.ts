import {
  THE_ROAD_TO_LEARN_REACT,
  TAMING_THE_STATE,
  THE_ROAD_TO_GRAPHQL,
  THE_ROAD_TO_REACT_WITH_FIREBASE,
} from './course-keys';

import {
  THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS,
  TAMING_THE_STATE_BUNDLE_KEYS,
  THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS,
  THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS,
} from './bundle-keys';

const ASSETS_URL =
  'https://rwieruch-public.sfo2.cdn.digitaloceanspaces.com';

export default {
  [THE_ROAD_TO_LEARN_REACT]: {
    header: 'The Road to React',
    courseId: THE_ROAD_TO_LEARN_REACT,
    url: 'https://roadtoreact.com',
    imageUrl: `${ASSETS_URL}/road-to-react/cover.png`,
    bundles: {
      [THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.STUDENT]: {
        header: 'The Bare Essentials',
        bundleId: THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.STUDENT,
        price: 0,
        weight: 1,
        imageUrl: `${ASSETS_URL}/road-to-react/3.png`,
      },
      [THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.INTERMEDIATE]: {
        header: 'The Essentials',
        bundleId: THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.INTERMEDIATE,
        price: 2900,
        weight: 2,
        imageUrl: `${ASSETS_URL}/road-to-react/2.png`,
      },
      [THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.PROFESSIONAL]: {
        header: 'The Professional',
        bundleId: THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS.PROFESSIONAL,
        price: 7900,
        weight: 3,
        imageUrl: `${ASSETS_URL}/road-to-react/1.png`,
      },
    },
  },
  [TAMING_THE_STATE]: {
    header: 'The Road to Redux',
    courseId: TAMING_THE_STATE,
    url: 'https://roadtoredux.com',
    imageUrl: `${ASSETS_URL}/road-to-redux/cover.png`,
    bundles: {
      [TAMING_THE_STATE_BUNDLE_KEYS.STUDENT]: {
        header: 'The Bare Essentials',
        bundleId: TAMING_THE_STATE_BUNDLE_KEYS.STUDENT,
        price: 0,
        weight: 1,
        imageUrl: `${ASSETS_URL}/road-to-redux/3.png`,
      },
      [TAMING_THE_STATE_BUNDLE_KEYS.INTERMEDIATE]: {
        header: 'The Essentials',
        bundleId: TAMING_THE_STATE_BUNDLE_KEYS.INTERMEDIATE,
        price: 2900,
        weight: 2,
        imageUrl: `${ASSETS_URL}/road-to-redux/2.png`,
      },
      [TAMING_THE_STATE_BUNDLE_KEYS.PROFESSIONAL]: {
        header: 'The Professional',
        bundleId: TAMING_THE_STATE_BUNDLE_KEYS.PROFESSIONAL,
        price: 7900,
        weight: 3,
        imageUrl: `${ASSETS_URL}/road-to-redux/1.png`,
      },
    },
  },
  [THE_ROAD_TO_GRAPHQL]: {
    header: 'The Road to GraphQL',
    courseId: THE_ROAD_TO_GRAPHQL,
    url: 'https://roadtographql.com',
    imageUrl: `${ASSETS_URL}/road-to-graphql/cover.png`,
    bundles: {
      [THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.STUDENT]: {
        header: 'The Bare Essentials',
        bundleId: THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.STUDENT,
        price: 0,
        weight: 1,
        imageUrl: `${ASSETS_URL}/road-to-graphql/3.png`,
      },
      [THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.INTERMEDIATE]: {
        header: 'The Essentials',
        bundleId: THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.INTERMEDIATE,
        price: 2900,
        weight: 2,
        imageUrl: `${ASSETS_URL}/road-to-graphql/2.png`,
      },
      [THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.PROFESSIONAL]: {
        header: 'The Professional',
        bundleId: THE_ROAD_TO_GRAPHQL_BUNDLE_KEYS.PROFESSIONAL,
        price: 7900,
        weight: 3,
        imageUrl: `${ASSETS_URL}/road-to-graphql/1.png`,
      },
    },
  },
  [THE_ROAD_TO_REACT_WITH_FIREBASE]: {
    header: 'The Road to Firebase',
    courseId: THE_ROAD_TO_REACT_WITH_FIREBASE,
    url: 'https://roadtofirebase.com',
    imageUrl: `${ASSETS_URL}/road-to-firebase/cover.png`,
    bundles: {
      [THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.STUDENT]: {
        header: 'The Bare Essentials',
        bundleId: THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.STUDENT,
        price: 0,
        weight: 1,
        imageUrl: `${ASSETS_URL}/road-to-firebase/3.png`,
      },
      [THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.INTERMEDIATE]: {
        header: 'The Essentials',
        bundleId:
          THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.INTERMEDIATE,
        price: 2900,
        weight: 2,
        imageUrl: `${ASSETS_URL}/road-to-firebase/2.png`,
      },
      [THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.PROFESSIONAL]: {
        header: 'The Professional',
        bundleId:
          THE_ROAD_TO_REACT_WITH_FIREBASE_BUNDLE_KEYS.PROFESSIONAL,
        price: 7900,
        weight: 3,
        imageUrl: `${ASSETS_URL}/road-to-firebase/1.png`,
      },
    },
  },
};
