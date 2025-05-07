import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import { useTheme } from "styled-components";

import {
  Container,
  List,
  Item,
  Info,
  Actions,
  Summary,
} from "./Cart.styles";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const theme = useTheme();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <h1>Seu Carrinho</h1>

      {items.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <Card key={item.id}>
                <Item>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                  <Info>
                    <strong>{item.title}</strong>
                    <p>R$ {item.price.toFixed(2)}</p>
                  </Info>
                  <Actions>
                    <Button
                      variant="secondary"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      –
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </Button>
                    <Button
                      variant="accent"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remover
                    </Button>
                  </Actions>
                </Item>
              </Card>
            ))}
          </List>

          <Summary>
            <p>
              Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong>
            </p>
            <Button variant="primary" onClick={() => alert("Finalizar compra!") }>
              Finalizar Compra
            </Button>
            <Button
              variant="accent"
              style={{ marginLeft: theme.spacing.md }}
              onClick={() => dispatch(clearCart())}
            >
              Limpar Carrinho
            </Button>
          </Summary>
        </>
      )}
    </Container>
  );
};

export default Cart;
