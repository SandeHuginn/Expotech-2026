const path = require('path');

// Carrega as configurações do arquivo .env localizado na pasta backend.
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

// Biblioteca utilizada para conectar o Node.js ao MySQL.
const mysql = require('mysql2/promise');

// Cria um conjunto de conexões reutilizáveis com o banco de dados.
const conexao = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'smarthome',

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Disponibiliza a conexão para os serviços do backend.
module.exports = conexao;