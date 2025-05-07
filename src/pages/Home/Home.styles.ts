// src/pages/Home.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;
