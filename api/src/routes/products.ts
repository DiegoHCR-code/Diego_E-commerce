import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '../types';

const router = Router();
let products: Product[] = [];

// List all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product
router.get('/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) return res.status(404).json({ message: 'Not found' });
  res.json(prod);
});

// Create product
router.post('/', (req, res) => {
  const { title, description, price, image, category } = req.body;
  const newProd: Product = { id: uuidv4(), title, description, price, image, category };
  products.push(newProd);
  res.status(201).json(newProd);
});

// Update product
router.put('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// Delete product
router.delete('/:id', (req, res) => {
  const before = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === before) return res.status(404).json({ message: 'Not found' });
  res.status(204).send();
});

export default router;