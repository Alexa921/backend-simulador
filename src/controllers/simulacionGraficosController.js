const { porcentajePorMeses, porcentajePorMesesConDesglose } = require('../services/simulacionGraficos');

exports.getPorcentajePorMeses = async (req, res) => {
    try {
        const data = await porcentajePorMeses();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el porcentaje por meses' });
    }
};

exports.getPorcentajePorMesesConDesglose = async (req, res) => {
    try {
        const data = await porcentajePorMesesConDesglose();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el desglose por meses' });
    }
};
