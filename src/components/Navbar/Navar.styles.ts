import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledLink = styled(Link)`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const CartCount = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;