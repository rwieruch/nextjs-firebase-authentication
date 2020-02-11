import { THE_ROAD_TO_LEARN_REACT } from '../course-keys';
import { THE_ROAD_TO_LEARN_REACT_BUNDLE_KEYS as BUNDLE_KEYS } from '../bundle-keys';

import migrate from '../migration';

const allowed = migrate(THE_ROAD_TO_LEARN_REACT);

export default {
  sections: [
    {
      label: 'Introduction',
      items: [
        {
          kind: 'introduction',
          label: 'Introduction',
          url: 'https://vimeo.com/232967406',
        },
      ],
      roles: allowed([
        BUNDLE_KEYS.STUDENT,
        BUNDLE_KEYS.INTERMEDIATE,
        BUNDLE_KEYS.PROFESSIONAL,
      ]),
    },
    {
      label: 'Onboarding',
      items: [
        {
          kind: 'onboarding',
          label: 'Onboarding',
          url: 'https://vimeo.com/232967406',
        },
      ],
      roles: allowed([
        BUNDLE_KEYS.STUDENT,
        BUNDLE_KEYS.INTERMEDIATE,
        BUNDLE_KEYS.PROFESSIONAL,
      ]),
    },
    {
      label: 'Book Download',
      items: [
        {
          kind: 'book-download',
          label: 'The Road to React (PDF)',
          url: 'road-to-react/book.pdf',
          fileName: 'the-road-to-react.pdf',
        },
        {
          kind: 'book-download',
          label: 'The Road to React (EPUB)',
          url: 'road-to-react/book.epub',
          fileName: 'the-road-to-react.epub',
        },
        {
          kind: 'book-download',
          label: 'The Road to React (MOBI)',
          url: 'road-to-react/book.mobi',
          fileName: 'the-road-to-react.mobi',
        },
      ],
      roles: allowed([
        BUNDLE_KEYS.STUDENT,
        BUNDLE_KEYS.INTERMEDIATE,
        BUNDLE_KEYS.PROFESSIONAL,
      ]),
    },
    {
      label: 'Book Online',
      items: [
        {
          kind: 'book-online',
          label: 'The Road to React (Online)',
          url: 'some-url',
        },
      ],
      roles: allowed([
        BUNDLE_KEYS.INTERMEDIATE,
        BUNDLE_KEYS.PROFESSIONAL,
      ]),
    },
    {
      label: 'React Props',
      items: [
        {
          kind: 'article',
          label: 'React Props',
          url:
            'https://www.robinwieruch.de/react-pass-props-to-component',
        },
      ],
      roles: allowed([BUNDLE_KEYS.PROFESSIONAL]),
    },
    {
      label: 'React State',
      items: [
        {
          kind: 'article',
          label: 'React State',
          url: 'https://www.robinwieruch.de/react-state',
        },
        {
          kind: 'article',
          label: 'React Lift State',
          url: 'https://www.robinwieruch.de/react-lift-state',
          secondaryUrl:
            'https://github.com/the-road-to-learn-react/react-lift-state',
        },
      ],
      roles: allowed([BUNDLE_KEYS.PROFESSIONAL]),
    },
    {
      label: 'React Snake',
      items: [
        {
          kind: 'article',
          label: 'React Lift State',
          url: 'https://www.robinwieruch.de/react-lift-state',
          secondaryUrl:
            'https://github.com/the-road-to-learn-react/react-lift-state',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 0',
          url: 'https://vimeo.com/232967309',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 1',
          url: 'https://vimeo.com/232967406',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 2',
          url: 'https://vimeo.com/232967819',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 3',
          url: 'https://vimeo.com/232968000',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 4',
          url: 'https://vimeo.com/232968363',
        },
        {
          kind: 'video',
          label: 'React Snake: Part 5',
          url: 'https://vimeo.com/232968722',
        },
      ],
      roles: allowed([BUNDLE_KEYS.PROFESSIONAL]),
    },
  ],
};
