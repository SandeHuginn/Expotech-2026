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

O frontend será desenvolvido utilizando HTML, CSS e JavaScript.

A comunicação entre frontend e backend será realizada por meio de requisições HTTP, utilizando JSON para troca de informações.

Exemplo de uma futura requisição:

```javascript
fetch('http://localhost:3000/api/dashboard')
    .then(response => response.json())
    .then(dados => {
        console.log(dados);
    });
```

Os endereços e formatos definitivos serão documentados conforme os endpoints forem implementados.

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
- [ ] Criação dos dados simulados.
- [ ] Implementação dos cálculos de consumo.
- [ ] Implementação das rotas do dashboard.
- [ ] Implementação das rotas dos aparelhos e cômodos.
- [ ] Implementação da detecção de anomalias.
- [ ] Implementação do chatbot.
- [ ] Integração com o frontend.
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