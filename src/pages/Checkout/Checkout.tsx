import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartSlice";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  Container,
  Form,
  Field,
  Summary,
  Item,
} from "./Checkout.styles";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    alert(`Obrigado pela compra, ${name}! Total: R$ ${total.toFixed(2)}`);
    navigate("/");
  };

  return (
    <Container>
      <h1>Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="name">Nome Completo</label>
          <Input
            id="name"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>
        <Field>
          <label htmlFor="address">Endereço</label>
          <Input
            id="address"
            placeholder="Rua, número, complemento"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Field>
        <Field>
          <label htmlFor="city">Cidade</label>
          <Input
            id="city"
            placeholder="Sua cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Field>
        <Field>
          <label htmlFor="zip">CEP</label>
          <Input
            id="zip"
            placeholder="00000-000"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </Field>
        <Button type="submit" variant="primary">
          Confirmar Pedido
        </Button>
      </Form>

      <Summary>
        <h2>Resumo do Pedido</h2>
        {items.map((item) => (
          <Item key={item.id}>
            <span>{item.title} x {item.quantity}</span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </Item>
        ))}
        <Item>
          <strong>Total</strong>
          <strong>R$ {total.toFixed(2)}</strong>
        </Item>
      </Summary>
    </Container>
  );
};

export default Checkout;