import {
  THE_ROAD_TO_LEARN_REACT,
  TAMING_THE_STATE,
  THE_ROAD_TO_GRAPHQL,
  THE_ROAD_TO_REACT_WITH_FIREBASE,
} from '../course-keys';

import roadToReact from './road-to-react';
import roadToRedux from './road-to-redux';
import roadToGraphql from './road-to-graphql';
import roadToFirebase from './road-to-firebase';

export default {
  [THE_ROAD_TO_LEARN_REACT]: roadToReact,
  [TAMING_THE_STATE]: roadToRedux,
  [THE_ROAD_TO_GRAPHQL]: roadToGraphql,
  [THE_ROAD_TO_REACT_WITH_FIREBASE]: roadToFirebase,
};
