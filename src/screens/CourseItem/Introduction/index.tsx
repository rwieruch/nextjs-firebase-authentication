import React from 'react';

import styled from 'styled-components';
import { Modal, Icon } from 'antd';

import { IntroductionData } from '@generated/client';

import { StyledCards, StyledCard } from '../styles';

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

type IntroductionCardProps = {
  item: IntroductionData;
};

const IntroductionCard = ({ item }: IntroductionCardProps) => {
  return (
    <StyledCard
      title={
        <>
          <Icon type="rocket" /> {item.label}
        </>
      }
    >
      {item.description}
    </StyledCard>
  );
};

type IntroductionProps = {
  introductionData: IntroductionData;
};

const Introduction = ({ introductionData }: IntroductionProps) => {
  return (
    <StyledCards>
      <IntroductionCard item={introductionData} />
    </StyledCards>
  );
};

export default Introduction;
