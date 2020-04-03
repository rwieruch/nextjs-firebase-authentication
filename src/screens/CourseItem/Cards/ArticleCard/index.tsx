import React from 'react';
import { Icon } from 'antd';

import { CurriculumItem } from '@generated/client';
import Link from '@components/Link';

import { StyledCard } from '../../styles';

type ArticleCardProps = {
  item: CurriculumItem;
};

const ArticleCard = ({ item }: ArticleCardProps) => {
  let actions = [<Link href={item.url || ''}>Read</Link>];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <Link href={item.secondaryUrl}>More</Link>
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
