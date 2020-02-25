import React from 'react';

import { IntroductionData } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

import VideoCard from '../Cards/VideoCard';
import { StyledCards } from '../styles';

type IntroductionProps = {
  introductionData: IntroductionData;
};

const Introduction = ({ introductionData }: IntroductionProps) => {
  return (
    <StyledCards>
      <VideoCard item={introductionData} />
    </StyledCards>
  );
};

export default Introduction;
