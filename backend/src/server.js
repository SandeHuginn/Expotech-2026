
// Importando as bibliotecas
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importando as rotas
const dashboardRoutes = require('./routes/dashboardRoutes');
const aparelhosRoutes = require('./routes/aparelhosRoutes');
const comodosRoutes = require('./routes/comodosRoutes');
const machineLearningRoutes = require('./routes/machineLearningRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

// Criando a aplicação
const app = express();

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Registrando as rotas
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dashboard/aparelhos', aparelhosRoutes);
app.use('/api/comodos', comodosRoutes);
app.use('/api/machine-learning', machineLearningRoutes);
app.use('/api/chatbot', chatbotRoutes);

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
