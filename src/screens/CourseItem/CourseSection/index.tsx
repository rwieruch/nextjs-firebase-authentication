import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Icon, Button } from 'antd';
import FileSaver from 'file-saver';
import b64toBlob from 'b64-to-blob';

import {
  UnlockedCourseSection,
  UnlockedCourseItem,
} from '@generated/client';
import { GET_BOOK } from '@queries/book';
import ExternalLink from '@components/ExternalLink';

import { StyledCard, StyledCards } from './styles';

const ITEM_ICONS = {
  Introduction: <Icon type="star" />,
  Onboarding: <Icon type="compass" />,
  BookDownload: <Icon type="book" />,
  BookOnline: <Icon type="cloud" />,
  Article: <Icon type="read" />,
  Video: <Icon type="video-camera" />,
};

const ACTIONS_LABEL = {
  Introduction: 'Bar',
  Onboarding: 'Foo',
  BookDownload: 'Download',
  BookOnline: 'Read',
  Article: 'Read',
  Video: 'Watch',
};

const getCommonActions = (item: UnlockedCourseItem) => {
  let actions = [
    <ExternalLink url={item.url}>
      {ACTIONS_LABEL[item.kind]}
    </ExternalLink>,
  ];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink url={item.secondaryUrl}>More</ExternalLink>
    );
  }

  return actions;
};

const getBookDownloadActions = (item: UnlockedCourseItem) => {
  const apolloClient = useApolloClient();

  const [isLoading, setIsLoading] = React.useState(false);

  const onDownload = async () => {
    setIsLoading(true);

    const { data } = await apolloClient.query({
      query: GET_BOOK,
      variables: {
        path: item.url,
        fileName: item.fileName || '',
      },
    });

    setIsLoading(false);

    const { fileName, body, contentType } = data.book;

    const blob = b64toBlob(body, contentType);
    FileSaver.saveAs(blob, fileName);
  };

  let actions = [
    <Button loading={isLoading} type="link" onClick={onDownload}>
      {ACTIONS_LABEL[item.kind]}
    </Button>,
  ];

  return actions;
};

const getActions = (item: UnlockedCourseItem) => {
  switch (item.kind) {
    case 'Introduction':
    case 'Onboarding':
    case 'BookOnline':
    case 'Article':
    case 'Video':
      return getCommonActions(item);
    case 'BookDownload':
      return getBookDownloadActions(item);
    default:
      return [];
  }
};

type CourseSectionProps = {
  section: UnlockedCourseSection;
};

const CourseSection = ({ section }: CourseSectionProps) => {
  return (
    <StyledCards>
      {section.items.map(item => {
        const actions = getActions(item);

        return (
          <StyledCard
            title={
              <>
                {ITEM_ICONS[item.kind]} {item.label}
              </>
            }
            actions={actions}
          >
            {item.description}
          </StyledCard>
        );
      })}
    </StyledCards>
  );
};

export default CourseSection;
