import Autor from '#models/autor.js';

export class AutoresController {
  constructor(databaseConnection) {
    Autor.configurarDB(databaseConnection);
  }

  async listarAutores(req, res) {
    try {
      const resulado = await Autor.pegarAutores();
      res.status(200).send(resulado);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async cadastrarAutor(req, res) {
    const { body } = req;
    const autor = new Autor(body);
    try {
      const resposta = await autor.salvar(autor);
      return res
        .status(201)
        .json({ message: 'autor criado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}
