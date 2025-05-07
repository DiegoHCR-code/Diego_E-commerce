export function formatBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  
  export function formatDateTime(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;
    return date.toLocaleString('pt-BR');
  }