# Expotech 2026 — Backend

## 1. Sobre o projeto

O Expotech 2026 é um projeto acadêmico de Smart Home (Casa Inteligente), desenvolvido com o objetivo de monitorar o consumo de energia elétrica de uma residência.

O sistema pretende fornecer informações sobre o consumo dos aparelhos, gastos energéticos, identificação de possíveis anomalias e assistência por meio de um chatbot inteligente.

Este repositório contém o desenvolvimento do backend, responsável pelo processamento das informações e disponibilização dos dados para o frontend.

## 2. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| JavaScript | Linguagem de programação |
| Node.js | Ambiente de execução |
| Express | Construção da API |
|MySQL Workbench|	Administração e consulta do banco|
|mysql2|	Comunicação entre Node.js e MySQL|
| CORS | Controle de acesso entre origens |
| Dotenv | Gerenciamento de variáveis de ambiente |
| Nodemon | Reinicialização automática durante o desenvolvimento |


## 3. Estrutura do projeto

```text
backend/
├── src/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── data/
└── README.md
```

### Responsabilidade dos diretórios

- **server.js:** inicialização e configuração do servidor.
- **routes:** definição dos endpoints da API.
- **controllers:** recebimento e tratamento das requisições.
- **services:** regras de negócio, cálculos e processamento de dados.
- **data:** armazenamento temporário de dados simulados em JSON.

## 4. Funcionalidades planejadas

### Dashboard geral
- Apresentar o consumo total de energia.
- Calcular os gastos estimados em reais.
- Apresentar os três aparelhos de maior consumo.
- Identificar os três aparelhos com possíveis anomalias.
- Comparar o consumo entre períodos.

### Monitoramento por cômodo
- Consultar os aparelhos de cada ambiente.
- Calcular o consumo individual.
- Calcular os gastos por cômodo.
- Identificar possíveis anomalias nos aparelhos.

### Machine Learning
- Analisar padrões de consumo.
- Identificar possíveis anomalias.
- Auxiliar na previsão de consumo energético.

### Chatbot
- Responder perguntas sobre consumo.
- Consultar informações dos aparelhos.
- Consultar gastos e consumo por cômodo.
- Fornecer sugestões de economia energética.


## 5. Endpoints da API

### Implementados

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/` | Verificar o funcionamento do servidor |
| GET | `/api/dashboard/consumo` | Consultar o resumo do consumo e dos gastos estimados |
| GET | `/api/dashboard/aparelhos` | Consultar os três aparelhos com maior consumo |

### GET `/api/dashboard/consumo`

Retorna os dados de consumo e gastos estimados para o período analisado.

**Exemplo de resposta — HTTP 200**

```json
{
  "periodo": "Últimos 30 dias",
  "consumo": {
    "atualKwh": 128.5,
    "anteriorKwh": 115.2,
    "diferencaKwh": 13.3,
    "variacaoPercentual": 11.55
  },
  "gasto": {
    "atualReais": 118.22,
    "anteriorReais": 105.98
  }
}
```

**Descrição dos campos**

| Campo | Descrição |
|---|---|
| `periodo` | Período de referência da consulta |
| `consumo.atualKwh` | Consumo atual em kWh |
| `consumo.anteriorKwh` | Consumo do período anterior em kWh |
| `consumo.diferencaKwh` | Diferença entre os consumos |
| `consumo.variacaoPercentual` | Variação percentual do consumo |
| `gasto.atualReais` | Gasto estimado atual em reais |
| `gasto.anteriorReais` | Gasto estimado do período anterior |

### GET `/api/dashboard/aparelhos`

Retorna os três aparelhos com maior consumo de energia, ordenados do maior para o menor consumo.

**Resposta de sucesso — HTTP 200**

```json
{
  "quantidade": 3,
  "aparelhos": [
    {
      "id": 1,
      "nome": "Ar-condicionado",
      "comodo": "Quarto 1",
      "consumoKwh": 48.5
    },
    {
      "id": 2,
      "nome": "Chuveiro elétrico",
      "comodo": "Banheiro",
      "consumoKwh": 32
    },
    {
      "id": 3,
      "nome": "Geladeira",
      "comodo": "Cozinha",
      "consumoKwh": 21
    }
  ]
} ```

**Descrição dos campos**

| Campo | Descrição |
|---|---|
| `quantidade` | Quantidade de aparelhos retornados |
| `aparelhos` | Lista dos aparelhos com maior consumo |
| `aparelhos.id` | Identificador do aparelho |
| `aparelhos.nome` | Nome do aparelho |
| `aparelhos.comodo` | Cômodo onde o aparelho está localizado |
| `aparelhos.consumoKwh` | Consumo do aparelho em kWh |

### Planejados

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/aparelhos` | Listar aparelhos |
| GET | `/api/aparelhos/:id` | Consultar aparelho específico |
| GET | `/api/comodos` | Listar cômodos |
| GET | `/api/comodos/:id` | Consultar informações de um cômodo |
| GET | `/api/chatbot` | Consultar informações disponíveis para o chatbot |

Os endpoints planejados serão atualizados conforme forem implementados.


## 6. Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.

### Instalação

Na pasta principal do projeto, execute:

```bash
npm install
```

### Inicialização

Execute:

```bash
npm run dev
```

O servidor estará disponível em:

```text
http://localhost:3000
```

Para verificar seu funcionamento, acesse:

```text
http://localhost:3000
```

Resposta esperada:

```json
{
  "mensagem": "Backend do Expotech 2026 funcionando!",
  "status": "online"
}
```


## 7. Integração com o frontend

O frontend utiliza HTML, CSS e JavaScript e está localizado no diretório `teste_dashboard copy/`.

A comunicação com o backend é realizada por meio de requisições HTTP utilizando `fetch()`, com troca de informações no formato JSON.

### Consumo da API

O frontend realiza uma requisição para:

```text
GET http://localhost:3000/api/dashboard/consumo
```

Exemplo de implementação:

```javascript
const API_URL = 'http://localhost:3000/api/dashboard/consumo';

async function carregarResumoConsumo() {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    console.log(dados);
}
```

### Indicadores e gráfico

Os dados recebidos pela API são utilizados para atualizar os elementos da dashboard:

- **Gráfico de consumo:** apresenta a comparação entre o consumo atual e o consumo do período anterior.
- **Consumo atual:** apresenta o consumo em kWh.
- **Gasto estimado:** apresenta o valor estimado em reais.
- **Variação do consumo:** apresenta a diferença percentual entre os períodos.

A atualização dos indicadores e do gráfico ocorre durante o carregamento da dashboard e também por meio do botão de atualização manual.

### Execução da integração

Para testar a comunicação entre frontend e backend:

1. Inicie o backend com `npm run dev`.
2. Abra o arquivo `index.html` localizado em `teste_dashboard copy/`.
3. A dashboard realizará a requisição à API e atualizará os indicadores com os dados recebidos.

## 8. Banco de dados

A implementação do banco de dados não faz parte da responsabilidade do desenvolvedor do backend neste momento.

Inicialmente, serão utilizados dados simulados em arquivos JSON para desenvolvimento e testes.

A estrutura definitiva será alinhada com o integrante responsável pelo banco de dados, garantindo compatibilidade com as necessidades da API.


## 9. Status do desenvolvimento

- [x] Configuração do Node.js e npm.
- [x] Inicialização do projeto com npm.
- [x] Instalação do Express.
- [x] Instalação do CORS.
- [x] Instalação do Dotenv.
- [x] Instalação do Nodemon.
- [x] Criação da estrutura de diretórios.
- [x] Criação do servidor Express.
- [x] Implementação da rota inicial de verificação.
- [x] Criação dos dados simulados.
- [x] Implementação dos cálculos de consumo.
- [x] Implementação da rota de resumo do consumo.
- [x] Integração do endpoint de consumo com o frontend.
- [x] Implementação do endpoint de ranking dos aparelhos.
- [x] Integração do ranking de aparelhos com o frontend.
- [ ] Implementação das rotas de consulta individual de aparelhos e das rotas dos cômodos.
- [ ] Implementação da detecção de anomalias.
- [ ] Implementação do chatbot.
- [ ] Integração com a estrutura definitiva de dados.

## 10. Histórico de alterações

### Versão 0.1.0 — Estrutura inicial

- Preparação do ambiente Node.js.
- Configuração do Express e dependências.
- Criação da estrutura inicial do backend.
- Implementação do primeiro servidor.
- Criação da rota de verificação de funcionamento.

---

**Projeto:** Expotech 2026  
**Módulo:** Backend  
**Linguagem principal:** JavaScript  
**Status:** Em desenvolvimento

## Endpoint: Resumo do Consumo

### GET `/api/dashboard/consumo`

Retorna um resumo do consumo de energia e dos gastos estimados para o período analisado.

**Resposta de sucesso — HTTP 200**

```json
{
  "periodo": "Últimos 30 dias",
  "consumo": {
    "atualKwh": 128.5,
    "anteriorKwh": 115.2,
    "diferencaKwh": 13.3,
    "variacaoPercentual": 11.55
  },
  "gasto": {
    "atualReais": 118.22,
    "anteriorReais": 105.98
  }
}
```

### Descrição dos campos

| Campo | Descrição |
|---|---|
| `periodo` | Período de referência da consulta |
| `consumo.atualKwh` | Consumo atual em kWh |
| `consumo.anteriorKwh` | Consumo do período anterior em kWh |
| `consumo.diferencaKwh` | Diferença entre os consumos |
| `consumo.variacaoPercentual` | Variação percentual do consumo |
| `gasto.atualReais` | Gasto estimado atual em reais |
| `gasto.anteriorReais` | Gasto estimado do período anterior |

### Implementação atual

- Os dados são simulados e estão armazenados em `backend/src/data/dashboardData.js`.
- Os cálculos são realizados em `backend/src/services/dashboardService.js`.
- O controller responsável pela resposta HTTP está em `backend/src/controllers/dashboardController.js`.
- A rota está definida em `backend/src/routes/dashboardRoutes.js`.

**Observação:** os valores são fictícios e a estimativa de gasto utiliza uma tarifa fixa simulada. A integração com o banco de dados será realizada posteriormente.

### Versão 0.2.0 — Resumo do consumo e integração inicial

- Criação da estrutura de dados simulados do dashboard.
- Implementação dos cálculos de consumo e gastos estimados.
- Criação do endpoint `GET /api/dashboard/consumo`.
- Integração inicial entre a dashboard e o backend utilizando `fetch()`.
- Atualização do gráfico de comparação de consumo com dados da API.
- Documentação do endpoint e do processo de integração.


**Observação:** atualmente, os dados de consumo são simulados e armazenados em arquivos JavaScript. O cálculo do gasto utiliza uma tarifa fixa simulada de R$ 0,92 por kWh. Esses valores serão substituídos ou adaptados quando ocorrer a integração com o banco de dados.

### Versão 0.3.0 — Ranking de aparelhos e integração com frontend

- Criação dos dados simulados dos aparelhos em `backend/src/data/aparelhosData.js`.
- Implementação da lógica de ordenação e seleção dos três aparelhos com maior consumo.
- Criação do endpoint `GET /api/dashboard/aparelhos`.
- Integração do ranking de aparelhos com o frontend utilizando `fetch()`.
- Atualização do HTML para exibir dinamicamente os aparelhos retornados pela API.
- Ajustes no CSS para melhorar a apresentação visual do ranking.
- Documentação do endpoint e do formato dos dados retornados pela API.



### Versão 0.4.0 — Integração com MySQL e implementação do CRUD

Nesta etapa, foi realizada a integração do backend com o banco de dados MySQL, permitindo armazenar e gerenciar os aparelhos cadastrados.

Anteriormente, os dados dos aparelhos eram simulados em arquivos JavaScript. Com a integração, as operações passaram a utilizar os registros armazenados no banco de dados.

Alterações realizadas:

# Instalação da biblioteca mysql2 para comunicação entre Node.js e MySQL.

# Configuração da conexão com o MySQL Server.

# Criação do arquivo backend/src/config/database.js.

# Utilização do Dotenv para carregar as configurações de conexão.

# Integração com o banco de dados smarthome.

# Utilização da tabela aparelhos para armazenar os registros.

# Implementação das operações de cadastro, consulta, atualização e exclusão de aparelhos (CRUD).

# Atualização dos controllers, services e routes para utilizar o MySQL.

# Implementação do cálculo de consumo atual com base nos aparelhos cadastrados.

# Realização de testes dos endpoints utilizando PowerShell.

# Criação do arquivo .env.example para compartilhar o modelo de configuração.

# Configuração do .gitignore para evitar o envio de credenciais e dependências ao Git.

# Remoção do diretório node_modules do controle de versão.


### 11. Integração com o banco de dados MySQL

O backend utiliza o MySQL para armazenar as informações dos aparelhos cadastrados.

A comunicação entre o Node.js e o banco é realizada pela biblioteca mysql2, utilizando consultas SQL.

Configuração do banco

Banco de dados: smarthome

Tabela: aparelhos

Campo ! Descrição

|id |Identificador único do aparelho|

|nome | Nome do aparelho|

|comodo| Cômodo onde o aparelho está localizado|

|consumo_kwh | Consumo de energia registrado em kWh|

# Arquivo de conexão

A conexão com o MySQL está configurada no arquivo:

backend/src/config/database.js

Esse arquivo utiliza as variáveis de ambiente para estabelecer a conexão com o banco.

A biblioteca mysql2/promise permite executar consultas SQL utilizando funções assíncronas.

Configuração do arquivo .env

Na pasta backend, o arquivo .env contém as informações necessárias para estabelecer a conexão com o MySQL.

Exemplo:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_NAME=smarthome
PORT=3000

A senha deve ser substituída pela senha configurada no MySQL Server.

O arquivo .env é utilizado apenas no ambiente local e não deve ser enviado ao GitHub.

# Arquivo .env.example

Foi criado o arquivo .env.example para servir como modelo de configuração aos integrantes do projeto.

Esse arquivo contém os nomes das variáveis necessárias, sem disponibilizar credenciais privadas.

Ao clonar o repositório, cada integrante poderá copiar o .env.example, criar seu próprio .env e preencher as informações do banco de dados.

# Arquivo .gitignore

O .gitignore foi configurado na raiz do projeto para impedir o rastreamento de arquivos desnecessários ou privados.

Entre eles:

node_modules/: dependências instaladas pelo npm.

.env: informações privadas de configuração.

*.log: arquivos de registro de execução.

O arquivo .env.example permanece disponível para compartilhamento.

### 12. Implementação do CRUD de aparelhos

CRUD representa as quatro operações básicas de gerenciamento de registros:

### Operação|Método HTTP|Finalidade

|CREATE| POST| Cadastrar um aparelho|

|READ |GET| Consultar aparelhos|

|UPDATE| PUT| Atualizar um aparelho|

|DELETE| DELETE |Excluir um aparelho|

As operações são realizadas por meio da API REST desenvolvida com Express.

Os dados enviados pelo frontend ou pelo PowerShell são recebidos pelos controllers e processados pelos services, responsáveis pela comunicação com o MySQL.

# Endpoints implementados

Método| Endpoint| Descrição

|GET | /api/dashboard/aparelhos/todos| Consultar todos os aparelhos|

|GET |/api/dashboard/aparelhos/:id| Consultar um aparelho pelo ID|

|POST |/api/dashboard/aparelhos| Cadastrar um aparelho|

|PUT |/api/dashboard/aparelhos/:id| Atualizar um aparelho|

|DELETE |/api/dashboard/aparelhos/:id| Excluir um aparelho|

Os endpoints já existentes de consumo e ranking continuam disponíveis.


GET — Consultar todos os aparelhos

Retorna todos os aparelhos cadastrados no banco de dados.

# Comando de teste:

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos/todos" -Method GET

GET — Consultar aparelho pelo ID

Permite consultar as informações de um aparelho específico.

# Comando de teste:

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos/id" -Method GET

O número 1 representa o ID do aparelho e pode ser substituído por outro identificador existente.

POST — Cadastrar aparelho

Permite adicionar um novo aparelho ao banco de dados.

# Comando de teste:

$dados = @{
    nome = "Ventilador"
    comodo = "Quarto 2"
    consumoKwh = 10.5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos" -Method POST -ContentType "application/json" -Body $dados

O backend recebe as informações e executa a inserção do registro no MySQL.

PUT — Atualizar aparelho

Permite modificar os dados de um aparelho existente.

# Comando de teste:

$dados = @{
    nome = "Ventilador atualizado"
    comodo = "Quarto 2"
    consumoKwh = 15.5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos/id" -Method PUT -ContentType "application/json" -Body $dados

O número 6 é um exemplo de ID e deve ser substituído pelo identificador de um aparelho cadastrado.

DELETE — Excluir aparelho

Permite remover um aparelho do banco de dados.

# Comando de teste:

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos/id" -Method DELETE

Quando a exclusão é realizada com sucesso, o backend retorna uma mensagem de confirmação.

A operação modifica diretamente os registros do MySQL.

### 13. Atualização do cálculo de consumo

O cálculo do consumo atual do dashboard foi integrado ao banco de dados.

Anteriormente, os valores eram obtidos de dados simulados. Atualmente, o backend consulta a tabela aparelhos e soma o consumo registrado.

A consulta utilizada é:

SELECT COALESCE(SUM(consumo_kwh), 0) AS consumoAtualKwh
FROM aparelhos;

O resultado é processado pelo arquivo:

# backend/src/services/dashboardService.js

O valor obtido é utilizado para calcular os indicadores de consumo e gasto estimado.

Observação: o consumo atual é calculado com dados do MySQL, mas o consumo anterior e a tarifa de energia ainda utilizam valores simulados do arquivo dashboardData.js.

### 14. Testes e execução do backend

As operações foram testadas utilizando o PowerShell, por meio de requisições HTTP para a API.

Os testes permitiram verificar o cadastro, a consulta, a atualização e a exclusão de aparelhos no MySQL.

Iniciar o backend

Na pasta principal do projeto:

node backend/src/server.js

O servidor ficará disponível em:

http://localhost:3000

Para encerrar o servidor, utilize Ctrl + C no terminal.

Consultar o resumo do consumo

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/consumo" -Method GET

Consultar os três aparelhos de maior consumo

Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/aparelhos" -Method GET

Reinstalar as dependências

Na pasta principal do projeto:

npm.cmd install

Esse comando instala as dependências descritas no package.json.

Para executar as consultas que dependem do banco de dados, o MySQL Server também precisa estar em funcionamento.

### 15. Integração do CRUD com o frontend

O backend disponibiliza os endpoints necessários para realizar as operações de gerenciamento dos aparelhos.

A equipe responsável pelo frontend poderá utilizar esses endpoints para implementar as funcionalidades de cadastro, edição, exclusão e consulta por meio da interface.

A comunicação será realizada utilizando JavaScript e requisições HTTP com fetch().

Exemplo de exclusão pelo frontend:

async function excluirAparelho(id) {
    const resposta = await fetch(
        `http://localhost:3000/api/dashboard/aparelhos/${id}`,
        {
            method: 'DELETE'
        }
    );

    const dados = await resposta.json();

    console.log(dados);
}

Quando o usuário utilizar um botão da interface, o frontend deverá enviar a requisição correspondente ao backend.

O backend será responsável por processar a operação e realizar a comunicação com o MySQL.

Status da integração:

|X|Implementação dos endpoints de CRUD no backend.

|X|Testes de cadastro, consulta, atualização e exclusão utilizando PowerShell.

|X|Integração das consultas de consumo e ranking com o MySQL.

||Integração dos botões e formulários de CRUD ao frontend.

||Implementação do histórico real de consumo.

||Implementação das demais funcionalidades planejadas.