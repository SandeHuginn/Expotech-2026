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

### Implementado

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/` | Verificar o funcionamento do servidor |

### Planejados

| Método | Endpoint | Descrição |
|-----|----------------------|---------------------------------------------|
| GET | `/api/dashboard` | Consultar indicadores gerais |
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

O frontend da dashboard está localizado na pasta `teste_dashboard copy/` e utiliza HTML, CSS e JavaScript.

A comunicação entre frontend e backend é realizada por meio de requisições HTTP utilizando a função `fetch()` do JavaScript. Os dados são transmitidos no formato JSON.

### Endpoint integrado

**GET `/api/dashboard/consumo`**

Retorna:
- Consumo atual em kWh.
- Consumo do período anterior em kWh.
- Diferença e variação percentual do consumo.
- Gastos estimados para os dois períodos.

### Exemplo de requisição

```javascript
const resposta = await fetch(
    'http://localhost:3000/api/dashboard/consumo'
);

const dados = await resposta.json();
```

### Funcionamento atual

- O frontend solicita os dados ao backend.
- O backend processa os dados e retorna uma resposta JSON.
- O JavaScript utiliza os valores recebidos para atualizar o gráfico de comparação de consumo.
- O botão de atualização realiza uma nova consulta à API.

### Execução durante o desenvolvimento

O backend é iniciado com `npm run dev` e fica disponível em `http://localhost:3000`.

O frontend pode ser aberto separadamente pelo navegador, utilizando o Live Server ou outro servidor local.

O CORS está habilitado no Express para permitir a comunicação entre origens diferentes durante o desenvolvimento.

**Observação:** a integração atual utiliza dados simulados. Os indicadores de aparelhos, cômodos e anomalias ainda dependem da implementação de novos endpoints.

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
- [x] Criação de dados simulados para o dashboard.
- [x] Implementação dos cálculos de consumo e gastos estimados.
- [x] Implementação do endpoint de resumo do consumo.
- [x] Integração inicial do frontend com o backend.
- [x] Atualização do gráfico com dados recebidos da API.
- [ ] Implementação das rotas dos aparelhos e cômodos.
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