import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'accent';

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    &:hover { background: ${({ theme }) => theme.colors.secondary}; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    &:hover { background: ${({ theme }) => theme.colors.primary}; }
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    &:hover { background: ${({ theme }) => theme.colors.primary}; }
  `,
};

export const StyledButton = styled.button<{ variant: Variant }>`
  ${({ variant }) => variantStyles[variant]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background 0.3s;
  cursor: pointer;
`;