import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent';
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...rest }) => (
  <StyledButton variant={variant} {...rest}>
    {children}
  </StyledButton>
);

export default Button;