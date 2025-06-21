const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionGraficosController');

router.get('/interes-por-mes/:id', controller.getInteresPorMesSimulacion);

module.exports = router;