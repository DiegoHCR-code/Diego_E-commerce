// api/src/app.ts
import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products';
import authRouter from './routes/auth';
import ordersRouter from './routes/orders';

const app = express();

app.use(cors());
app.use(express.json());

// rotas da API
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// rota de health-check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}/api/health`);
});
