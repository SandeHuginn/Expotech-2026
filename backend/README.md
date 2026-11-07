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