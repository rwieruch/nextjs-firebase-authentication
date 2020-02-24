import React from 'react';
import { Icon } from 'antd';

import { IntroductionData } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

import { StyledCards, StyledCard } from '../styles';

type IntroductionProps = {
  introductionData: IntroductionData;
};

const Introduction = ({ introductionData }: IntroductionProps) => {
  let actions = [
    <ExternalLink href={introductionData.url}>Bar</ExternalLink>,
  ];

  return (
    <StyledCards>
      <StyledCard
        title={
          <>
            <Icon type="star" /> {introductionData.label}
          </>
        }
        actions={actions}
      >
        {introductionData.description}
      </StyledCard>
    </StyledCards>
  );
};

export default Introduction;
