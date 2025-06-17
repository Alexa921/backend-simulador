// Cálculo de tasa automática según monto y plazo
function calcularTasa(monto, plazo) {
    const tasaMin = 0.01;
    const tasaMax = 40;
    const montoMin = 1000000;
    const montoMax = 20000000;
    const plazoMin = 6;
    const plazoMax = 120;

    const pesoMonto = 0.6;
    const pesoPlazo = 0.4;

    const factorMonto = Math.min(Math.max((monto - montoMin) / (montoMax - montoMin), 0), 1);
    const factorPlazo = Math.min(Math.max((plazo - plazoMin) / (plazoMax - plazoMin), 0), 1);

    const tasa = tasaMin + (factorMonto * pesoMonto + factorPlazo * pesoPlazo) * (tasaMax - tasaMin);
    return +(tasa).toFixed(2);
}

// Cálculo de cuota
function calcularCuota(monto, tasa, plazo) {
    const tasaMensual = tasa / 100 / 12;
    return +(monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1)).toFixed(2);
}

// Cálculo de tabla de amortización
function calcularAmortizacion(monto, tasa, plazo, cuota, abonoCapital = 0) {
    const tasaMensual = tasa / 100 / 12;
    let saldo = monto;
    const tabla = [];

    for (let i = 1; i <= plazo; i++) {
        const saldoInicial = saldo;
        const interes = +(saldo * tasaMensual).toFixed(2);
        const abono = +(cuota - interes + abonoCapital).toFixed(2);
        const saldoFinal = +(saldo - abono).toFixed(2);

        tabla.push({
            cuota: i,
            saldoInicial,
            interes,
            cuotaFija: cuota,
            saldoFinal: saldoFinal < 0 ? 0 : saldoFinal
        });

        saldo = saldoFinal;
        if (saldo <= 0) break;
    }
    return tabla;
}


module.exports = {
    calcularTasa,
    calcularCuota,
    calcularAmortizacion
};