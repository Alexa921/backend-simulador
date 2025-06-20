const { obtenerSimulaciones } = require('../models/simuladorModel');

async function porcentajePorMeses() {
    const simulaciones = await obtenerSimulaciones();
    // Agrupa por mes y suma los valores
    const datosPorMes = {};

    simulaciones.forEach(sim => {
        // Extrae el mes en formato YYYY-MM de la fechaSimulacion
        const mes = sim.fechaSimulacion ? sim.fechaSimulacion.slice(6, 10) + '-' + sim.fechaSimulacion.slice(3, 5) : '';
        if (!mes) return;

        if (!datosPorMes[mes]) {
            datosPorMes[mes] = { total: 0, impuestos: 0, count: 0 };
        }
        // Suma totalPagar como total y calcula un valor de impuestos si existe
        datosPorMes[mes].total += sim.totalPagar || 0;
        datosPorMes[mes].impuestos += sim.impuestos || 0;
        datosPorMes[mes].count += 1;
    });

    // Devuelve el porcentaje de impuestos por mes
    return Object.entries(datosPorMes).map(([mes, datos]) => ({
        mes,
        porcentajeImpuestos: datos.total > 0 ? (datos.impuestos / datos.total) * 100 : 0
    }));
}

async function porcentajePorMesesConDesglose() {
    const simulaciones = await obtenerSimulaciones();
    const datosPorMes = {};

    simulaciones.forEach(sim => {
        const mes = sim.fechaSimulacion ? sim.fechaSimulacion.slice(6, 10) + '-' + sim.fechaSimulacion.slice(3, 5) : '';
        if (!mes) return;

        if (!datosPorMes[mes]) {
            datosPorMes[mes] = { total: 0, ingresos: 0, gastos: 0, ahorro: 0, impuestos: 0, count: 0 };
        }
        datosPorMes[mes].total += sim.totalPagar || 0;
        datosPorMes[mes].ingresos += sim.ingresos || 0;
        datosPorMes[mes].gastos += sim.gastos || 0;
        datosPorMes[mes].ahorro += sim.ahorro || 0;
        datosPorMes[mes].impuestos += sim.impuestos || 0;
        datosPorMes[mes].count += 1;
    });

    return Object.entries(datosPorMes).map(([mes, datos]) => ({
        mes,
        porcentaje: {
            ingresos: datos.total > 0 ? (datos.ingresos / datos.total) * 100 : 0,
            gastos: datos.total > 0 ? (datos.gastos / datos.total) * 100 : 0,
            ahorro: datos.total > 0 ? (datos.ahorro / datos.total) * 100 : 0,
            impuestos: datos.total > 0 ? (datos.impuestos / datos.total) * 100 : 0
        }
    }));
}

module.exports = {
    porcentajePorMeses,
    porcentajePorMesesConDesglose
};
