const { interesPorMesSimulacion } = require('../services/simulacionGraficos');

exports.getInteresPorMesSimulacion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await interesPorMesSimulacion(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el interés por mes de la simulación' });
    }
};
