import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
    toast.error('Ocorreu um erro inesperado. Tente novamente.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Algo deu errado.</h2>
          <p>Recarregue a página ou tente novamente mais tarde.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
