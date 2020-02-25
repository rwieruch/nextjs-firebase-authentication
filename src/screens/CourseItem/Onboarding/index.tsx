import React from 'react';
import { Icon } from 'antd';

import { OnboardingData, OnboardingItem } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

import { StyledCards, StyledCard } from '../styles';

type OnboardingCardProps = {
  item: OnboardingItem;
};

const OnboardingCard = ({ item }: OnboardingCardProps) => {
  let actions = [<ExternalLink href={item.url}>Hop On</ExternalLink>];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink href={item.secondaryUrl}>More</ExternalLink>
    );
  }

  return (
    <StyledCard
      title={
        <>
          <Icon type="star" /> {item.label}
        </>
      }
      actions={actions}
    >
      {item.description}
    </StyledCard>
  );
};

type OnboardingProps = {
  onboardingData: OnboardingData;
};

const Onboarding = ({ onboardingData }: OnboardingProps) => {
  return (
    <StyledCards>
      {onboardingData.items.map((item, index) => (
        <OnboardingCard key={index} item={item} />
      ))}
    </StyledCards>
  );
};

export default Onboarding;
