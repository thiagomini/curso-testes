import knex from 'knex';
export function criaConexaoDB(config) {
  const connection = knex(config);

  connection[Symbol.dispose] = () => {
    console.log('Fechando conexão com o banco de dados...');
    return connection.destroy();
  };

  return connection;
}
