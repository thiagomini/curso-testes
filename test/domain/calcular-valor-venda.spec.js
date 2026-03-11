import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { calcularValorVenda } from '#domain/calcular-valor-venda.js';
import '../e2e/test.each.js';

describe('Calcular valor venda', () => {
  test.each([
    { tipoPagamento: 'CARTAO_CREDITO', valorEsperado: 105 },
    { tipoPagamento: 'CARTAO_DEBITO', valorEsperado: 102 },
    { tipoPagamento: 'PIX', valorEsperado: 95 },
    { tipoPagamento: 'BOLETO', valorEsperado: 100 },
    { tipoPagamento: 'DINHEIRO', valorEsperado: 100 },
  ])(
    'Calcula valor para $tipoPagamento',
    ({ tipoPagamento, valorEsperado }) => {
      assert.equal(calcularValorVenda(100, tipoPagamento), valorEsperado);
    },
  );

  test.each([{ tipoPagamento: 'PAYPAL' }, { tipoPagamento: 'CRYPTO' }])(
    'Lança erro para tipo de pagamento inválido: $tipoPagamento',
    ({ tipoPagamento }) => {
      assert.throws(
        () => calcularValorVenda(100, tipoPagamento),
        new Error('Tipo de pagamento inválido'),
      );
    },
  );
});
