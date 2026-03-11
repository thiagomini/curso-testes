import { limparBanco } from '#commands/limpar-banco.command.js';
import conexao from '#db/singleton-connection.js';
import './test.each.js';

export async function globalSetup() {
  console.debug('Executando global setup para testes E2E...');
  await limparBanco();
}

export async function globalTeardown() {
  await conexao.destroy();
}
