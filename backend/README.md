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
| MySQL Workbench|	Administração e consulta do banco|
| mysql2|	Comunicação entre Node.js e MySQL|
| CORS | Controle de acesso entre origens |
| Dotenv | Gerenciamento de variáveis de ambiente |
| Nodemon | Reinicialização automática durante o desenvolvimento |
| Python | Linguagem utilizada na implementação do Machine Learning |
| Flask | Criação da API Python para disponibilizar o modelo |
| NumPy | Organização dos dados de consumo |
| Scikit-learn | Implementação do algoritmo Isolation Forest |
| Dialogflow ES | Interpretação das mensagens e identificação das intenções do chatbot |
| Cloudflare Tunnel (cloudflared) | Disponibilização temporária do backend local por meio de um endereço HTTPS público |
| Webhook | Comunicação entre o Dialogflow e o backend |


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
| GET | `/api/dashboard/aparelhos/todos` | Listar todos os aparelhos |
| GET | `/api/dashboard/aparelhos/:id` | Consultar um aparelho específico pelo ID |
| GET | `/api/comodos` | Listar cômodos e seus aparelhos, consumo e gasto estimado |
| GET | `/api/comodos/:nome` | Consultar um cômodo específico pelo nome |
| POST | `/api/machine-learning/analisar-consumo` | Analisar o consumo de um aparelho e identificar possíveis anomalias |
| POST | `/api/chatbot/webhook` | Recebe as mensagens enviadas pelo Dialogflow ES e processa as intenções do chatbot |

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


### GET `/api/comodos`

Retorna a lista de cômodos identificados a partir dos aparelhos cadastrados, incluindo a quantidade de aparelhos, o consumo total, o gasto estimado e os respectivos aparelhos.

**Resposta de sucesso — HTTP 200**

```json
{
  "quantidade": 2,
  "comodos": [
    {
      "nome": "Cozinha",
      "quantidadeAparelhos": 2,
      "consumoTotalKwh": 35.5,
      "aparelhos": [
        {
          "id": 1,
          "nome": "Geladeira",
          "comodo": "Cozinha",
          "consumoKwh": 21
        },
        {
          "id": 2,
          "nome": "Micro-ondas",
          "comodo": "Cozinha",
          "consumoKwh": 14.5
        }
      ],
      "gastoEstimadoReais": 32.66
    }
  ]
}
```

**Descrição dos campos**

| Campo | Descrição |
|---|---|
| `quantidade` | Quantidade de cômodos encontrados |
| `comodos` | Lista de cômodos |
| `nome` | Nome do cômodo |
| `quantidadeAparelhos` | Quantidade de aparelhos no cômodo |
| `consumoTotalKwh` | Soma do consumo dos aparelhos |
| `aparelhos` | Lista de aparelhos pertencentes ao cômodo |
| `gastoEstimadoReais` | Gasto estimado com base na tarifa configurada |


### GET `/api/comodos/:nome`

Retorna as informações de um cômodo específico, identificado pelo nome, incluindo seus aparelhos, quantidade de aparelhos, consumo total e gasto estimado.

**Exemplo de requisição**

```http
GET /api/comodos/Cozinha
```

**Resposta de sucesso — HTTP 200**

```json
{
  "nome": "Cozinha",
  "quantidadeAparelhos": 2,
  "consumoTotalKwh": 35.5,
  "aparelhos": [
    {
      "id": 1,
      "nome": "Geladeira",
      "comodo": "Cozinha",
      "consumoKwh": 21
    },
    {
      "id": 2,
      "nome": "Micro-ondas",
      "comodo": "Cozinha",
      "consumoKwh": 14.5
    }
  ],
  "gastoEstimadoReais": 32.66
}
```

**Possíveis respostas**

| Código HTTP | Descrição |
|---|---|
| 200 | Cômodo encontrado |
| 400 | Nome do cômodo inválido ou ausente |
| 404 | Cômodo não encontrado |
| 500 | Erro interno ao consultar o cômodo |

**Observação:** nomes com espaços ou caracteres especiais devem ser codificados na URL. No JavaScript, pode-se utilizar `encodeURIComponent(nome)` para isso.

### POST `/api/machine-learning/analisar-consumo`

Recebe o nome de um aparelho e uma lista de registros de consumo em kWh. Os dados são encaminhados para a API Python, que utiliza o algoritmo Isolation Forest, da biblioteca Scikit-learn, para identificar possíveis anomalias.

**Exemplo de requisição**

```json
{
  "aparelho": "Geladeira",
  "consumos": [2.1, 2.3, 2.0, 2.2, 2.4, 2.1, 8.5]
}
```

**Resposta de sucesso — HTTP 200**

```json
{
  "aparelho": "Geladeira",
  "quantidadeRegistros": 7,
  "anomalias": [
    {
      "dia": 7,
      "consumoKwh": 8.5,
      "classificacao": "Possível anomalia"
    }
  ]
}
```

**Descrição dos campos**

| Campo | Descrição |
|---|---|
| `aparelho` | Nome do aparelho analisado |
| `quantidadeRegistros` | Quantidade de registros enviados para análise |
| `anomalias` | Lista de possíveis anomalias identificadas |
| `dia` | Posição do registro na lista de consumos |
| `consumoKwh` | Valor do consumo identificado |
| `classificacao` | Classificação atribuída pelo modelo |

**Observação:** a implementação atual utiliza dados enviados diretamente na requisição. A integração com o histórico real de consumo do banco de dados será realizada posteriormente. Os resultados são indicativos e precisam ser avaliados com um conjunto maior de dados.

### Planejados

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/chatbot` | Consultar informações disponíveis para o chatbot |

Os endpoints planejados serão atualizados conforme forem implementados.

#### Chatbot — Integração com Dialogflow ES

O chatbot utiliza o Dialogflow ES para interpretar as mensagens enviadas pelos usuários. Quando uma intenção é identificada, o Dialogflow encaminha os dados para o webhook do backend.

**Endpoint:** `POST /api/chatbot/webhook`

**Intenções implementadas:**

| Intenção | Descrição |
|---|---|
| `ConsultarConsumoGeral` | Consulta o consumo atual e o gasto estimado da residência. |
| `ConsultarConsumoComodo` | Consulta a quantidade de aparelhos, o consumo total e o gasto estimado de um cômodo específico. |

**Parâmetros:**

- `comodo`: nome do cômodo informado pelo usuário, utilizado na intenção `ConsultarConsumoComodo`.

**Formato da resposta:**

O backend retorna um objeto JSON com a propriedade `fulfillmentText`, contendo a resposta em linguagem natural que será apresentada pelo Dialogflow.

Exemplo:

```json
{
  "fulfillmentText": "O consumo atual da residência é de 128.5 kWh."
}
```

**Dependências e situação dos testes:**

A consulta dos dados depende da conexão com o banco de dados MySQL. A comunicação entre Dialogflow, Cloudflare Tunnel e webhook do backend foi testada com sucesso, mas a validação das respostas utilizando dados reais permanece pendente enquanto o banco de dados não estiver disponível.


## 6. Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Python instalado.

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

#### Inicialização da API de Machine Learning

Na pasta principal do projeto, ative o ambiente virtual Python:

```powershell
.\machine-learning\.venv\Scripts\Activate.ps1
```

Em seguida, inicie a API Python:

```powershell
python machine-learning/app.py
```

A API ficará disponível em:

```text
http://127.0.0.1:5000
```

**Importante:** para utilizar o endpoint de Machine Learning, os servidores Node.js e Python precisam estar em execução simultaneamente.

### 6.1. Como executar o Chatbot

O chatbot utiliza o Dialogflow ES para interpretar as mensagens e o Cloudflare Tunnel para permitir que o Dialogflow acesse o backend executado localmente.

**Pré-requisitos:**
- Node.js e npm instalados.
- Dependências do backend instaladas.
- Agente criado no Dialogflow ES.
- Cloudflare Tunnel (`cloudflared`) instalado.

**1. Iniciar o backend**

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
npm run dev
```

O backend ficará disponível localmente em `http://localhost:3000`.

**2. Iniciar o Cloudflare Tunnel**

Abra outro terminal e execute:

```powershell
cloudflared tunnel --url http://localhost:3000
```

Caso o comando não seja reconhecido no Windows, utilize o caminho completo do executável, ajustando-o conforme a instalação:

```powershell
& "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000
```

O Cloudflare fornecerá um endereço público HTTPS semelhante a:

`https://exemplo.trycloudflare.com`

**3. Configurar o Dialogflow ES**

No console do Dialogflow ES:

1. Acesse a opção **Fulfillment**.
2. Habilite o webhook.
3. Informe o endereço público gerado pelo Cloudflare, acrescentando `/api/chatbot/webhook`.
4. Salve as configurações.
5. Acesse cada intenção implementada e habilite **Enable webhook call for this intent**.
6. Salve as alterações.

**4. Testar a integração**

Utilize o recurso **Try it now** do Dialogflow para enviar perguntas como:

- Quanto de energia consumimos?
- Quanto a cozinha está consumindo?
- Qual é o consumo do banheiro?

**Observações importantes:**

- O endereço do Cloudflare Quick Tunnel é temporário e pode mudar quando o túnel for reiniciado.
- Sempre que isso acontecer, atualize o endereço configurado no Dialogflow.
- Os terminais do backend e do Cloudflare precisam permanecer abertos durante os testes.
- O Cloudflare Quick Tunnel é utilizado para desenvolvimento e testes, não como configuração definitiva de produção.
- As consultas que dependem dos dados reais precisam de uma conexão funcional com o MySQL.


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
- [x] Implementação das rotas de consulta individual de aparelhos e das rotas dos cômodos.
- [ ] Validação das consultas individuais e dos cômodos com o MySQL.
- [x] Implementação inicial da detecção de anomalias com Isolation Forest.
- [x] Criação da API Python utilizando Flask.
- [x] Integração entre a API Node.js e a API Python.
- [x] Teste da análise de consumo por meio do PowerShell.
- [ ] Integração da análise com o histórico real de consumo do banco de dados.
- [x] Criação do agente e configuração das intenções no Dialogflow ES.
- [x] Implementação do webhook do chatbot no backend.
- [x] Integração do Dialogflow ES com o backend utilizando Cloudflare Tunnel.
- [ ] Validação das consultas do chatbot utilizando dados reais do MySQL.
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


### Versão 0.5.0 — Integração completa com MySQL, histórico de consumo e validação do backend

Nesta atualização, foram ampliadas e consolidadas as funcionalidades implementadas na versão 0.4.0, com foco na integração do backend ao banco de dados MySQL, no processamento do histórico de consumo, na análise de anomalias por Machine Learning e nas consultas realizadas pelo chatbot.

Também foram implementadas melhorias na validação das requisições, no tratamento de erros e na organização das conexões com o banco de dados.

**Alterações realizadas:**

#### 1. Banco de dados MySQL
- [x] Integração do backend com o banco `smarthome`.
- [x] Configuração do pool de conexões utilizando `mysql2/promise`.
- [x] Utilização das variáveis de ambiente por meio do Dotenv.
- [x] Integração da tabela `aparelhos`.
- [x] Integração da tabela `leituras_consumo` para armazenar e consultar o histórico de consumo.
- [x] Integração da tabela `configuracoes_energia` para consultar a tarifa de energia.
- [x] Implementação de consultas SQL para obtenção dos dados.
- [x] Validação da conexão entre Node.js e MySQL.

#### 2. Dashboard e consumo energético
- [x] Atualização do endpoint `GET /api/dashboard/consumo`.
- [x] Consulta do histórico de consumo armazenado no MySQL.
- [x] Comparação entre o consumo atual e o período anterior.
- [x] Cálculo da diferença de consumo em kWh.
- [x] Cálculo da variação percentual entre períodos.
- [x] Cálculo dos gastos estimados utilizando a tarifa cadastrada no banco.
- [x] Manutenção do ranking dos três aparelhos de maior consumo.
- [x] Testes das consultas utilizando PowerShell.

#### 3. Gerenciamento de aparelhos — CRUD
- [x] Implementação do cadastro de aparelhos (`POST`).
- [x] Implementação da consulta de aparelhos (`GET`).
- [x] Implementação da atualização de aparelhos (`PUT`).
- [x] Implementação da exclusão de aparelhos (`DELETE`).
- [x] Validação dos identificadores recebidos nas requisições.
- [x] Validação dos campos `nome`, `comodo` e `consumoKwh`.
- [x] Tratamento de dados inválidos com HTTP 400.
- [x] Tratamento de aparelhos inexistentes com HTTP 404.
- [x] Testes completos de cadastro, consulta, atualização e exclusão.

#### 4. Monitoramento por cômodos
- [x] Implementação do endpoint `GET /api/comodos`.
- [x] Implementação do endpoint `GET /api/comodos/:nome`.
- [x] Consulta dos aparelhos pertencentes a cada cômodo.
- [x] Cálculo do consumo total por cômodo.
- [x] Cálculo do gasto estimado por cômodo.
- [x] Integração das consultas com o MySQL.
- [x] Validação dos resultados utilizando PowerShell.

#### 5. Machine Learning
- [x] Integração da API Node.js com a API Python desenvolvida em Flask.
- [x] Utilização do algoritmo Isolation Forest para identificação de possíveis anomalias.
- [x] Atualização do endpoint `POST /api/machine-learning/analisar-consumo`.
- [x] Implementação da consulta de histórico de consumo por ID do aparelho.
- [x] Envio dos registros históricos do MySQL para análise.
- [x] Retorno das possíveis anomalias identificadas em formato JSON.
- [x] Validação da integração utilizando PowerShell.

#### 6. Chatbot
- [x] Implementação do endpoint `POST /api/chatbot/webhook`.
- [x] Processamento da intenção `ConsultarConsumoGeral`.
- [x] Processamento da intenção `ConsultarConsumoComodo`.
- [x] Integração das consultas do chatbot com os dados armazenados no MySQL.
- [x] Retorno das respostas por meio da propriedade `fulfillmentText`.
- [x] Testes locais das intenções utilizando requisições simuladas do Dialogflow ES.

#### 7. Tratamento de erros e validações
- [x] Implementação de tratamento de exceções nos controllers.
- [x] Retorno HTTP 400 para requisições inválidas.
- [x] Retorno HTTP 404 para registros inexistentes.
- [x] Implementação do tratamento de rotas não encontradas.
- [x] Implementação de middleware para erros internos.
- [x] Testes de validação dos dados enviados à API.
- [x] Verificação básica do comportamento do pool de conexões.

#### 8. Testes e documentação
- [x] Testes dos principais endpoints utilizando PowerShell.
- [x] Testes das operações CRUD com persistência no MySQL.
- [x] Testes de integração entre Node.js, MySQL e Python.
- [x] Testes locais das funcionalidades do chatbot.
- [x] Execução de cinco requisições simultâneas, todas com HTTP 200.
- [x] Atualização da documentação dos endpoints.
- [x] Documentação das tabelas e consultas SQL.
- [x] Documentação dos comandos de teste utilizados no PowerShell.
- [x] Organização das instruções de configuração do ambiente.w

**Resultado da versão 0.5.0:**

O backend encontra-se funcional no ambiente de desenvolvimento, com integração ao MySQL, gerenciamento de aparelhos, consultas de consumo, monitoramento por cômodos, análise de anomalias e processamento das intenções implementadas no chatbot.

As principais funcionalidades foram verificadas por meio de requisições HTTP e testes locais. A integração completa com o frontend e a reprodução do ambiente em outras máquinas permanecem como etapas de validação.

**Status:** Funcionalidades principais do backend implementadas e testadas localmente.