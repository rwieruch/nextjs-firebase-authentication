import React from 'react';
import { Icon } from 'antd';

import { CurriculumItem } from '@generated/client';
import ExternalLink from '@components/ExternalLink';

import { StyledCard } from '../../styles';

type ArticleCardProps = {
  item: CurriculumItem;
};

const ArticleCard = ({ item }: ArticleCardProps) => {
  let actions = [
    <ExternalLink href={item.url || ''}>Read</ExternalLink>,
  ];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <ExternalLink href={item.secondaryUrl}>More</ExternalLink>
    );
  }

  return (
    <StyledCard
      title={
        <>
          <Icon type="read" /> {item.label}
        </>
      }
      actions={actions}
    >
      {item.description}
    </StyledCard>
  );
};

export default ArticleCard;
