import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import type { Product } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { api } from "../../services/api";
import SkeletonCard from "../../components/UI/SkeletonCard/SkeletonCard";
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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get<Product>(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setError(null);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Erro ao carregar produto";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (product) dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <Container>
        <SkeletonCard />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p style={{ color: "red" }}>{error}</p>
        <BackLink as={Link} to="/">
          Voltar para a lista
        </BackLink>
      </Container>
    );
  }

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
