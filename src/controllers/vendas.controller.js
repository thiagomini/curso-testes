import Venda from '#models/venda.js';
import {
  TAXA_POR_TIPO_PAGAMENTO,
  calcularValorVenda,
} from '#domain/calcular-valor-venda.js';

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
        valor: calcularValorVenda(valorBase, tipoPagamento),
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
