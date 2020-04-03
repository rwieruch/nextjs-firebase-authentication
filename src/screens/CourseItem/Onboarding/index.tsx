import React from 'react';
import { Icon } from 'antd';

import { OnboardingData, OnboardingItem } from '@generated/client';
import Link from '@components/Link';

import { StyledCards, StyledCard } from '../styles';

type OnboardingCardProps = {
  item: OnboardingItem;
};

const OnboardingCard = ({ item }: OnboardingCardProps) => {
  let actions = [<Link href={item.url}>Hop On</Link>];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <Link href={item.secondaryUrl}>More</Link>
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
