import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import type { Product } from '../../redux/slices/productSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';

import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import FilterPanel from '../../components/Filters/FilterPanel';
import SkeletonCard from '../../components/UI/SkeletonCard/SkeletonCard';

import { Container, Grid } from './Home.styles';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector((state: RootState) => state.products);
  const { selectedCategories, priceRange } = useSelector((state: RootState) => state.filters);

  const [search, setSearch] = useState('');

  // Busca produtos na API se ainda não carregados
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Filtra por busca, categoria e preço
  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategories.length ? selectedCategories.includes(p.category) : true) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container>
      <Input
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: '300px', marginBottom: '1.5rem' }}
      />
      <FilterPanel />

      {/* Exibe skeletons enquanto carrega */}
      {status === 'loading' && (
        <Grid>
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </Grid>
      )}

      {/* Mensagem de erro */}
      {status === 'failed' && <p>Erro ao carregar produtos: {error}</p>}

      {/* Lista de produtos carregados */}
      {status === 'succeeded' && (
        <Grid>
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <h2>{product.title}</h2>
                  <p style={{ color: '#666', margin: '0.5rem 0' }}>
                    {product.description}
                  </p>
                  <strong style={{ display: 'block', marginBottom: '1rem' }}>
                    R$ {product.price.toFixed(2)}
                  </strong>
                  <Button variant="accent" onClick={() => handleAddToCart(product)}>
                    Adicionar ao carrinho
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;