import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Summary = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
