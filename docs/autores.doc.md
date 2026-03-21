## Cadastrar Autor

Rota: (POST) /autores

- Autor cadastrado com sucesso
- Erro ao tentar cadastrar um autor com dados inválidos (dados vazios)

## Listar Autores

Rota: (GET) /autores

- Dados de autores recuperados com sucesso.
- Lista vazia é retornada quando não existem autores cadastrados.
- (hipotético): Retorna um erro quando o usuário não está logado.

## Recuperar um Autor

Rota: (GET) /autores/:id

- Dados do autor retornado com sucesso

- Retorna um erro (404) quando o autor não existe
- Retorna um erro quando o Id é inválido
