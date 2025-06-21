const { Simulacion } = require('../models/simuladorModel');

const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

async function interesPorMesSimulacion(simulacionId) {
    const sim = await Simulacion.findById(simulacionId).exec();
    if (!sim || !Array.isArray(sim.amortizacion)) return [];

    // Obtener el mes de inicio desde la fechaSimulacion (formato esperado: DD/MM/YYYY)
    let mesInicio = 0;
    if (sim.fechaSimulacion) {
        const partes = sim.fechaSimulacion.split('/');
        if (partes.length === 3) {
            mesInicio = parseInt(partes[1], 10) - 1; // 0-indexed
        }
    }

    return sim.amortizacion.map((cuota, idx) => {
        // Calcula el mes correspondiente, haciendo el ciclo de 0 a 11
        const mesIdx = (mesInicio + idx) % 12;
        return {
            mes: MESES[mesIdx],
            interes: Number((cuota.interes || 0).toFixed(2))
        };
    });
}

module.exports = {
    interesPorMesSimulacion,
};
