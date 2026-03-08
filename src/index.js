import { databaseConfig } from './config/database.config.js';
import { criaConexaoDB } from './db/client.factory.js';
import Autor from './models/autor.js';

using conexao = criaConexaoDB(databaseConfig);
Autor.configurarDB(conexao);
const autores = await Autor.pegarAutores();
console.log(autores);
