import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';
import { api } from '../../services/api';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Container, Form, Title } from './Login.styles';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;
    dispatch(setUser(user));
    // opcional: salvar token em localStorage
    localStorage.setItem('token', token);
    navigate('/profile');
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
