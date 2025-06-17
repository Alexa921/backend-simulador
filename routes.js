const express = require('express');
const router = express.Router();
const simuladorController = require('./src/controllers/simuladorController.js').simuladorController;

router.post('/simulador', simuladorController.simular);
router.get('/simulador/todos', simuladorController.obtenerSimulaciones);

module.exports = router;

