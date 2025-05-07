import React, { useState } from 'react';
import { api } from '../../services/api';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NewProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError('Selecione uma imagem');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('category', category);
    formData.append('image', file);

    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setTitle(''); setDescription(''); setPrice(0); setCategory(''); setFile(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao cadastrar produto';
      setError(msg);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Cadastrar Novo Produto</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Produto cadastrado com sucesso!</p>}

      <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required />
      <Input type="number" placeholder="Preço" value={price} onChange={e => setPrice(Number(e.target.value))} required />
      <Input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} required />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />

      <Button type="submit" variant="primary">Cadastrar</Button>
    </Form>
  );
};

export default NewProduct;
