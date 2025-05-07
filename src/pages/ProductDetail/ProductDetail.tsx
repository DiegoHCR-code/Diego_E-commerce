import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import type { Product } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  Container,
  Image,
  Title,
  Description,
  Price,
  Actions,
  BackLink,
} from "./ProductDetail.styles";
import Button from "../../components/UI/Button/Button";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector<RootState, Product | undefined>((state) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!product) {
    return (
      <Container>
        <p>Produto não encontrado.</p>
        <BackLink as={Link} to="/">
          Voltar para a lista
        </BackLink>
      </Container>
    );
  }

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <Container>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>R$ {product.price.toFixed(2)}</Price>
      <Actions>
        <Button variant="primary" onClick={handleAdd}>
          Adicionar ao carrinho
        </Button>
        <BackLink as={Link} to="/">
          Voltar
        </BackLink>
      </Actions>
    </Container>
  );
};

export default ProductDetail;
