import { databaseConfig } from './config/database.config.js';
import { criaConexaoDB } from './db/client.factory.js';

using conexao = criaConexaoDB(databaseConfig);
const autores = await conexao.select('*').from('autores');
console.log(autores);
