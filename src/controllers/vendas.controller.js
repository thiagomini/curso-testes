import Venda from '#models/venda.js';

const TAXA_POR_TIPO_PAGAMENTO = {
  CARTAO_CREDITO: 1.05,
  CARTAO_DEBITO: 1.02,
  PIX: 0.95,
  BOLETO: 1,
  DINHEIRO: 1,
};

function calcularValorFinal(valorBase, tipoPagamento) {
  const multiplicador = TAXA_POR_TIPO_PAGAMENTO[tipoPagamento];
  return Math.round(valorBase * multiplicador);
}

export class VendasController {
  constructor(databaseConnection) {
    Venda.configurarDB(databaseConnection);
  }

  async cadastrarVenda(req, res) {
    const { body } = req;
    const livroId = body.idLivro ?? body.livro_id;
    const valorBase = Number(body.valor);
    const tipoPagamento = body.modoPagamento ?? body.tipo_pagamento;

    if (!livroId || Number.isNaN(valorBase) || !tipoPagamento) {
      return res.status(400).json({ message: 'Dados inválidos para venda' });
    }

    if (!TAXA_POR_TIPO_PAGAMENTO[tipoPagamento]) {
      return res.status(400).json({ message: 'Tipo de pagamento inválido' });
    }

    try {
      const livroExiste = await Venda.existeLivro(livroId);
      if (!livroExiste) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }

      const venda = new Venda({
        livro_id: livroId,
        valor: calcularValorFinal(valorBase, tipoPagamento),
        tipo_pagamento: tipoPagamento,
      });

      const resposta = await venda.salvar();

      return res
        .status(201)
        .json({ message: 'venda registrada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}
