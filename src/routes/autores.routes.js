import { Router } from 'express';

const router = Router();

router.get('/autores', (req, res) => {
  res.send({ autores: ['Autor 1', 'Autor 2', 'Autor 3'] });
});

export default router;
