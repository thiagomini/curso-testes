import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { calcularValorVenda } from '#domain/calcular-valor-venda.js';

describe('Calcular valor venda', () => {
  test('Aplica taxa de 5% para CARTAO_CREDITO', () => {
    const valorBase = 100;
    const tipoPagamento = 'CARTAO_CREDITO';

    const valorCalculado = calcularValorVenda(valorBase, tipoPagamento);

    assert.equal(valorCalculado, 105);
  });
  test('Aplica taxa de 2% para CARTAO_DEBITO', () => {
    const valorBase = 100;
    const tipoPagamento = 'CARTAO_DEBITO';

    const valorCalculado = calcularValorVenda(valorBase, tipoPagamento);

    assert.equal(valorCalculado, 102);
  });
  test('Aplica desconto de 5% para PIX', () => {
    const valorBase = 100;
    const tipoPagamento = 'PIX';

    const valorCalculado = calcularValorVenda(valorBase, tipoPagamento);

    assert.equal(valorCalculado, 95);
  });
  test('Não aplica taxa para BOLETO', () => {
    const valorBase = 100;
    const tipoPagamento = 'BOLETO';

    const valorCalculado = calcularValorVenda(valorBase, tipoPagamento);

    assert.equal(valorCalculado, 100);
  });
  test('Não aplica taxa para DINHEIRO', () => {
    const valorBase = 100;
    const tipoPagamento = 'DINHEIRO';

    const valorCalculado = calcularValorVenda(valorBase, tipoPagamento);

    assert.equal(valorCalculado, 100);
  });
});
