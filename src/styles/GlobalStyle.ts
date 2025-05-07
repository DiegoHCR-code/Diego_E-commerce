// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";
import type { DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, nav, section {
    display: block;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary}, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button, input, textarea, select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export const theme: DefaultTheme = {
  colors: {
    primary: "#0070f3",
    secondary: "#1DB954",
    accent: "#E91E63",
    background: "#f9f9f9",
    surface: "#ffffff",
    text: "#333333",
    muted: "#666666",
    error: "#ff1744",
  },
  fonts: {
    primary: "'Roboto', 'Helvetica Neue', Arial",
    headings: "'Montserrat', sans-serif",
  },
  fontSizes: {
    xs: "0.75rem", 
    sm: "0.875rem", 
    md: "1rem", 
    lg: "1.125rem", 
    xl: "1.25rem", 
    "2xl": "1.5rem", 
  },
  spacing: {
    xs: "0.25rem", 
    sm: "0.5rem", 
    md: "1rem", 
    lg: "1.5rem", 
    xl: "2rem", 
  },
  borderRadius: "0.5rem",
};
