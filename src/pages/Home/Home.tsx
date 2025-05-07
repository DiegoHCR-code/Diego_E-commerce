// src/pages/Home.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import type { Product } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// Componentes UI reutilizáveis
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

// Apenas o container e grid ficam em styled-components
import { Container, Grid } from "./Home.styles";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);

  // Exemplo de busca
  const [search, setSearch] = useState("");
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product: Product) =>
    dispatch(addToCart(product));

  return (
    <Container>
      {/* Barra de busca */}
      <Input
        placeholder="Buscar produto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: "300px", marginBottom: "1.5rem" }}
      />

      <Grid>
        {filtered.map(product => (
          <Card key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "1rem" }}>
              <h2>{product.title}</h2>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                {product.description}
              </p>
              <strong style={{ display: "block", marginBottom: "1rem" }}>
                R$ {product.price.toFixed(2)}
              </strong>

              <Button
                variant="primary"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
