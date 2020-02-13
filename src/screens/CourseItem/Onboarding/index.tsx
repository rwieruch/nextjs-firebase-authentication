import React from 'react';
import { Icon } from 'antd';

import { OnboardingData } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

import { StyledCards, StyledCard } from '../styles';

type OnboardingProps = {
  onboardingData: OnboardingData;
};

const Onboarding = ({ onboardingData }: OnboardingProps) => {
  let actions = [
    <ExternalLink url={onboardingData.url}>Foo</ExternalLink>,
  ];

  if (onboardingData.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink url={onboardingData.secondaryUrl}>
        More
      </ExternalLink>
    );
  }

  return (
    <StyledCards>
      <StyledCard
        title={
          <>
            <Icon type="star" /> {onboardingData.label}
          </>
        }
        actions={actions}
      >
        {onboardingData.description}
      </StyledCard>
    </StyledCards>
  );
};

export default Onboarding;
