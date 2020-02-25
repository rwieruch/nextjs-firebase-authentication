import React from 'react';

import { CurriculumSection } from '@generated/client';

import VideoCard from '../Cards/VideoCard';
import ArticleCard from '../Cards/ArticleCard';
import { StyledCards } from '../styles';

type CurriculumProps = {
  curriculumSection: CurriculumSection;
};

const Curriculum = ({ curriculumSection }: CurriculumProps) => (
  <StyledCards>
    {curriculumSection.items.map(item => {
      switch (item.kind) {
        case 'Article':
          return <ArticleCard item={item} />;
        case 'Video':
          return <VideoCard item={item} />;
        default:
          return null;
      }
    })}
  </StyledCards>
);

export default Curriculum;
