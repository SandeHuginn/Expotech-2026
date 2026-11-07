
// Importando as bibliotecas
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Criando a aplicação
const app = express();

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Primeira rota da API
app.get('/', (req, res) => {
    res.json({
        mensagem: 'Backend do Expotech 2026 funcionando!',
        status: 'online'
    });
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
