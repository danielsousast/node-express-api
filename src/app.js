const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { dbUrl } = require('./config/mongodb');

// Iniciando aplicação
const app = express()
app.use(express.json())

// Conexão com banco de dados MongoDB
mongoose.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Mongo connected')   
);

// Arquivos estáticos Express
app.use('/files', express.static(
    path.resolve(__dirname, "..", "tmp", "uploads")
));

// Rotas da aplicação
app.use(require('./routes'));

module.exports = app;