import { Router } from 'express';
import { AutoresController } from '#controllers/autores.controller.js';
import db from '#db/singleton-connection.js';
const router = Router();

const autoresController = new AutoresController(db);

router.get('/autores', autoresController.listarAutores);

export default router;
