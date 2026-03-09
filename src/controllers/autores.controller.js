import Autor from '#models/autor.js';

export class AutoresController {
  constructor(databaseConnection) {
    Autor.configurarDB(databaseConnection);
  }

  async listarAutores(req, res) {
    const resulado = await Autor.pegarAutores();
    res.status(200).send(resulado);
  }
}
