import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '../types';
import fs from 'fs';
import path from 'path';

const router = Router();

// Configuração do multer para uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

let products: Product[] = [];

// GET /api/products
router.get('/', (_req, res) => res.json(products));

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(prod);
});

// POST /api/products (com upload de imagem)
router.post('/', upload.single('image'), (req, res) => {
  const { title, description, price, category } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Imagem é obrigatória' });
  const imagePath = `/uploads/${req.file.filename}`;
  const newProduct: Product = {
    id: uuidv4(), title, description, price: Number(price), image: imagePath, category
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id (atualização, opcionalmente com nova imagem)
router.put('/:id', upload.single('image'), (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  const updated = { ...products[idx], ...req.body } as Product;
  if (req.file) updated.image = `/uploads/${req.file.filename}`;
  products[idx] = updated;
  res.json(updated);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const before = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === before) return res.status(404).json({ message: 'Produto não encontrado' });
  res.status(204).send();
});

export default router;