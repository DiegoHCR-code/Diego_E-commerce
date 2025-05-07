import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.headings};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Price = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackLink = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;