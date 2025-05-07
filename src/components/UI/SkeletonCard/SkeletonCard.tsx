import React from 'react';
import {
  SkeletonCardContainer,
  SkeletonContent,
  SkeletonLine,
} from './SkeletonCard.styles';

const SkeletonCard: React.FC = () => (
  <SkeletonCardContainer>
    <SkeletonContent>
      <SkeletonLine width="60%" />
      <SkeletonLine width="80%" />
      <SkeletonLine width="40%" />
      <SkeletonLine width="90%" />
    </SkeletonContent>
  </SkeletonCardContainer>
);

export default SkeletonCard;
