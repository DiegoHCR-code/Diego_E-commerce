import React from 'react';
import type { ReactNode } from 'react';
import { CardContainer } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ children, onClick }) => (
  <CardContainer onClick={onClick}>{children}</CardContainer>
);

export default Card;