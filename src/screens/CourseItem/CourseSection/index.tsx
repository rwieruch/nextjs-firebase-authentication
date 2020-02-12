import React from 'react';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';
import { Modal, Icon } from 'antd';
import FileSaver from 'file-saver';
import b64toBlob from 'b64-to-blob';
import ReactPlayer from 'react-player';

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

const StyledModal = styled(Modal)`
  min-width: 640px;
  min-height: 360px;

  .ant-modal-body {
    width: 640px;
    height: 360px;
    padding: 0;
    margin: 0;
  }
`;

const VideoCard = ({ item }: { item: UnlockedCourseItem }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  let actions = [
    <>
      <StyledModal
        centered
        footer={null}
        closable={false}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <ReactPlayer controls url={item.url} />
      </StyledModal>

      <a onClick={() => setIsOpen(true)}>
        {ACTIONS_LABEL[item.kind]}
      </a>
    </>,
  ];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink url={item.secondaryUrl}>More</ExternalLink>
    );
  }

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
};

const CommonCard = ({ item }: { item: UnlockedCourseItem }) => {
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
};

const BookDownloadCard = ({ item }: { item: UnlockedCourseItem }) => {
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
    <a onClick={onDownload}>
      {isLoading ? <Icon type="loading" /> : ACTIONS_LABEL[item.kind]}
    </a>,
  ];

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
};

type CourseSectionProps = {
  section: UnlockedCourseSection;
};

const CourseSection = ({ section }: CourseSectionProps) => {
  return (
    <StyledCards>
      {section.items.map(item => {
        switch (item.kind) {
          case 'Introduction':
          case 'Onboarding':
          case 'BookOnline':
          case 'Article':
            return <CommonCard item={item} />;
          case 'Video':
            return <VideoCard item={item} />;
          case 'BookDownload':
            return <BookDownloadCard item={item} />;
          default:
            return null;
        }
      })}
    </StyledCards>
  );
};

export default CourseSection;
