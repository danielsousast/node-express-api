const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/nodedb',
{useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Mongo connected')
)

app.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")))

app.use(require('./routes'))

module.exports = app;