import conexao from '#db/singleton-connection.js';
import app from '#src/app.js';
import { after, describe, test } from 'node:test';
import request from 'supertest';

describe('Cadastro de autor', () => {
  after(async () => {
    await conexao.destroy();
  });

  test('Cadastra um autor com sucesso', async () => {
    return request(app)
      .post('/autores')
      .send({
        nome: 'Jorge Amado',
        nacionalidade: 'Brasileira',
      })
      .expect(201);
  });
});
