const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const FileController = require('./app/controllers/FileController');
const SessionController = require('./app/controllers/SessionController');

const auth = require('./app/middlewares/auth');

const routes = new express.Router()
const upload = multer(multerConfig)

routes.post('/sessions', SessionController.store)

routes.post('/users', UserController.store)

// Middlewares de autenticação
routes.use(auth);

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

routes.post('/files', upload.single('file'), FileController.store)

module.exports = routes