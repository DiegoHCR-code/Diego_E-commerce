import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { clearUser } from '../../redux/slices/userSlice';
import { fetchOrdersByUser } from '../../redux/slices/ordersSlice';
import type { Order } from '../../redux/slices/ordersSlice';
import Button from '../../components/UI/Button/Button';
import {
  Container,
  Info,
  StyledLink,
  OrdersContainer,
  OrderCard,
  OrderHeader,
  OrderItems,
  OrderItemRow,
} from './Profile.styles';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { items: orders, status } = useSelector((state: RootState) => state.orders);

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
        {orders.map((order: Order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <span>Pedido #{order.id.slice(0, 8)}</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </OrderHeader>
            <OrderItems>
              {order.items.map(item => (
                <OrderItemRow key={item.productId}>
                  <span>{item.productId}</span>
                  <span>Qtd: {item.quantity}</span>
                </OrderItemRow>
              ))}
            </OrderItems>
            <small>Data: {new Date(order.createdAt).toLocaleString()}</small>
          </OrderCard>
        ))}
        {status === 'succeeded' && orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
      </OrdersContainer>
    </Container>
  );
};

export default Profile;