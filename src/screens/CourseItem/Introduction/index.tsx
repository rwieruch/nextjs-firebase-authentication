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
    <ExternalLink url={introductionData.url}>Bar</ExternalLink>,
  ];

  if (introductionData.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink url={introductionData.secondaryUrl}>
        More
      </ExternalLink>
    );
  }

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
