import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '../types';

const router = Router();
const users: User[] = [];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email } = req.body;
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: uuidv4(), name: email.split('@')[0], email };
    users.push(user);
  }
  // return token as user id for simplicity
  res.json({ user, token: user.id });
});

export default router;
