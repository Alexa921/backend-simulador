const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulacionGraficosController');

router.get('/porcentaje-meses', controller.getPorcentajePorMeses);
router.get('/porcentaje-meses-desglose', controller.getPorcentajePorMesesConDesglose);

module.exports = router;