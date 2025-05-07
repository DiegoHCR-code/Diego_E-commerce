import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearUser } from "../../redux/slices/userSlice";
import { fetchOrdersByUser } from "../../redux/slices/ordersSlice";
import type { Order } from "../../redux/slices/ordersSlice";
import Button from "../../components/UI/Button/Button";
import { formatBRL } from "../../utils/formatter";
import {
  Container,
  Info,
  StyledLink,
  OrdersContainer,
  OrderCard,
  OrderHeader,
  OrderItems,
  ItemRow,
  ItemImage,
  ItemInfo,
} from "./Profile.styles";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { items: orders, status } = useSelector((state: RootState) => state.orders);
  const products = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUser(user.id.toString()));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  if (!user) {
    return (
      <Container>
        <p>Você não está logado.</p>
        <StyledLink to="/login">Ir para login</StyledLink>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Perfil</h1>
      <Info>
        <span><strong>Nome:</strong> {user.name}</span>
        <span><strong>Email:</strong> {user.email}</span>
      </Info>
      <Button variant="accent" onClick={handleLogout}>Logout</Button>

      <OrdersContainer>
        <h2>Meus Pedidos</h2>
        {status === 'loading' && <p>Carregando pedidos...</p>}
        {status === 'succeeded' && orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
        {status === 'succeeded' && orders.map((order: Order) => {
                // Recalcula o total usando preços atuais
                const computedTotal = order.items.reduce((sum, item) => {
                  const prod = products.find(p => p.id.toString() === item.productId);
                  return sum + (prod ? prod.price * item.quantity : 0);
                }, 0);

                return (
          <OrderCard key={order.id}>
            <OrderHeader>
  <span>Pedido #{order.id.slice(0,8)}</span>
  <span>{formatBRL(computedTotal)}</span>
</OrderHeader>
            <OrderItems>
              {order.items.map(item => {
                const product = products.find(p => p.id.toString() === item.productId);
                return (
                  <ItemRow key={item.productId}>
                    {product && (
                      <ItemImage src={product.image} alt={product.title} />
                    )}
                    <ItemInfo>
                      <span>{product ? product.title : 'Produto removido'}</span>
                      <span>Qtd: {item.quantity}</span>
                    </ItemInfo>
                  </ItemRow>
                );
              })}
            </OrderItems>
            <small>Data: {new Date(order.createdAt).toLocaleString()}</small>
          </OrderCard>
        );
      })}
      </OrdersContainer>
    </Container>
  );
};

export default Profile;
