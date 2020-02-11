import React from 'react';
import styled from 'styled-components';
import { Icon, Card } from 'antd';

import { UnlockedCourseSection } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 300px;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ant-card-body {
    flex: 1;
  }
`;

const StyledCards = styled.div`
  margin: 16px;

  display: grid;
  align-items: center;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-gap: 16px;
`;

const ICONS = {
  INTRODUCTION: <Icon type="star" />,
  ONBOARDING: <Icon type="compass" />,
  BOOK_DOWNLOAD: <Icon type="book" />,
  BOOK_ONLINE: <Icon type="cloud" />,
  ARTICLE: <Icon type="read" />,
  VIDEO: <Icon type="video-camera" />,
};

const ACTIONS = {
  INTRODUCTION: 'Bar',
  ONBOARDING: 'Foo',
  BOOK_DOWNLOAD: 'Download',
  BOOK_ONLINE: 'Read',
  ARTICLE: 'Read',
  VIDEO: 'Watch',
};

type CourseSectionProps = {
  section: UnlockedCourseSection;
};

const CourseSection = ({ section }: CourseSectionProps) => {
  return (
    <StyledCards>
      {section.items.map(item => {
        let actions = [
          <ExternalLink url={item.url}>
            {ACTIONS[item.kind]}
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
                {ICONS[item.kind]} {item.label}
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
