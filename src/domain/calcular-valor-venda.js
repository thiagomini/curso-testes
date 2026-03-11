export const TAXA_POR_TIPO_PAGAMENTO = {
  CARTAO_CREDITO: 1.05,
  CARTAO_DEBITO: 1.02,
  PIX: 0.95,
  BOLETO: 1,
  DINHEIRO: 1,
};

export function calcularValorVenda(valorBase, tipoPagamento) {
  const multiplicador = TAXA_POR_TIPO_PAGAMENTO[tipoPagamento];
  if (multiplicador === undefined) {
    throw new Error('Tipo de pagamento inválido');
  }
  return Math.round(valorBase * multiplicador);
}
