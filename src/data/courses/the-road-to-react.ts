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
          kind: 'Introduction',
          label: 'Introduction',
          description: 'Lorem ipsum ...',
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
          kind: 'Onboarding',
          label: 'Onboarding',
          description: 'Lorem ipsum ...',
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
          kind: 'BookDownload',
          label: 'The Road to React (PDF)',
          description: 'Lorem ipsum ...',
          url: 'road-to-react/book.pdf',
          fileName: 'the-road-to-react.pdf',
        },
        {
          kind: 'BookDownload',
          label: 'The Road to React (EPUB)',
          description: 'Lorem ipsum ...',
          url: 'road-to-react/book.epub',
          fileName: 'the-road-to-react.epub',
        },
        {
          kind: 'BookDownload',
          label: 'The Road to React (MOBI)',
          description: 'Lorem ipsum ...',
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
          kind: 'BookOnline',
          label: 'The Road to React (Online)',
          description: 'Lorem ipsum ...',
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
          kind: 'Article',
          label: 'React Props',
          description: 'Lorem ipsum ...',
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
          kind: 'Article',
          label: 'React State',
          description: 'Lorem ipsum ...',
          url: 'https://www.robinwieruch.de/react-state',
        },
        {
          kind: 'Article',
          label: 'React Lift State',
          description: 'Lorem ipsum ...',
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
          kind: 'Article',
          label: 'React Lift State',
          description: 'Lorem ipsum ...',
          url: 'https://www.robinwieruch.de/react-lift-state',
          secondaryUrl:
            'https://github.com/the-road-to-learn-react/react-lift-state',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 0',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232967309',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 1',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232967406',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 2',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232967819',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 3',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232968000',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 4',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232968363',
        },
        {
          kind: 'Video',
          label: 'React Snake: Part 5',
          description: 'Lorem ipsum ...',
          url: 'https://vimeo.com/232968722',
        },
      ],
      roles: allowed([BUNDLE_KEYS.PROFESSIONAL]),
    },
  ],
};
