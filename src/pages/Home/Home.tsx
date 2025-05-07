import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import type { Product } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  Container,
  Card,
  Image,
  Info,
  Title,
  Description,
  Price,
  Button,
} from "./Home.styles";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container>
      {products.map((product) => (
        <Card key={product.id}>
          <Image src={product.image} alt={product.title} />
          <Info>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <Price>R$ {product.price.toFixed(2)}</Price>
            <Button onClick={() => handleAddToCart(product)}>
              Adicionar ao carrinho
            </Button>
          </Info>
        </Card>
      ))}
    </Container>
  );
};

export default Home;
