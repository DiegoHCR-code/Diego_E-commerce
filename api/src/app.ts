import express from 'express';
import cors from 'cors';
import path from 'path';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import ordersRouter from './routes/orders';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));