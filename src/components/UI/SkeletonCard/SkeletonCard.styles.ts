import styled, { keyframes } from 'styled-components';

// simples animação de brilho
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonCardContainer = styled.div`
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.4),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;

export const SkeletonContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonLine = styled.div<{ width: string }>`
  height: 1rem;
  width: ${({ width }) => width};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
`;