import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartSlice";
import { api } from "../../services/api";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { toast } from "react-toastify";
import { Container, Form, Field, Summary, Item } from "./Checkout.styles";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Você precisa estar logado para finalizar o pedido.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: user.id,
        items: items.map((i) => ({
          productId: i.id.toString(),
          quantity: i.quantity,
        })),
      };

      await api.post("/orders", payload);
      dispatch(clearCart());
      toast.success("Pedido confirmado com sucesso!");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao processar o pedido.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Processando..." : "Confirmar Pedido"}
        </Button>
      </Form>

      <Summary>
        <h2>Resumo do Pedido</h2>
        {items.map((item) => (
          <Item key={item.id}>
            <span>
              {item.title} x {item.quantity}
            </span>
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
