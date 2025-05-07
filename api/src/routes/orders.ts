import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { Order, OrderItem } from '../types';

const router = Router();
const orders: Order[] = [];

// GET all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// POST create order
router.post('/', (req, res) => {
  const { userId, items } = req.body as { userId: string; items: OrderItem[] };
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  const newOrder: Order = { id: uuidv4(), userId, items, total, createdAt: new Date() };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

export default router;