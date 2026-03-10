import conexao from '#db/singleton-connection.js';
import app from '#src/app.js';
import { after, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

async function criarLivroParaVenda() {
  const [autor] = await conexao('autores')
    .insert(
      {
        nome: `Autor teste venda ${Date.now()}`,
        nacionalidade: 'Brasileira',
      },
      '*',
    )
    .returning('*');

  const [editora] = await conexao('editoras')
    .insert(
      {
        nome: `Editora teste venda ${Date.now()}`,
        cidade: 'Sao Paulo',
        email: `editora.venda.${Date.now()}@teste.com`,
      },
      '*',
    )
    .returning('*');

  const [livro] = await conexao('livros')
    .insert(
      {
        titulo: `Livro teste venda ${Date.now()}`,
        paginas: 120,
        autor_id: autor.id,
        editora_id: editora.id,
      },
      '*',
    )
    .returning('*');

  return livro;
}

describe('Cadastro de venda', () => {
  after(async () => {
    await conexao.destroy();
  });

  test('Aplica taxa de 5% para CARTAO_CREDITO', async () => {
    const livro = await criarLivroParaVenda();
    const resposta = await request(app).post('/vendas').send({
      idLivro: livro.id,
      valor: 100,
      modoPagamento: 'CARTAO_CREDITO',
    });

    assert.equal(resposta.status, 201);
    assert.equal(resposta.body.content[0].tipo_pagamento, 'CARTAO_CREDITO');
    assert.equal(resposta.body.content[0].valor, 105);
  });

  test('Aplica taxa de 2% para CARTAO_DEBITO', async () => {
    const livro = await criarLivroParaVenda();

    const resposta = await request(app).post('/vendas').send({
      idLivro: livro.id,
      valor: 100,
      modoPagamento: 'CARTAO_DEBITO',
    });

    assert.equal(resposta.status, 201);
    assert.equal(resposta.body.content[0].tipo_pagamento, 'CARTAO_DEBITO');
    assert.equal(resposta.body.content[0].valor, 102);
  });

  test('Aplica desconto de 5% para PIX', async () => {
    const livro = await criarLivroParaVenda();
    const resposta = await request(app).post('/vendas').send({
      idLivro: livro.id,
      valor: 100,
      modoPagamento: 'PIX',
    });

    assert.equal(resposta.status, 201);
    assert.equal(resposta.body.content[0].tipo_pagamento, 'PIX');
    assert.equal(resposta.body.content[0].valor, 95);
  });
});
