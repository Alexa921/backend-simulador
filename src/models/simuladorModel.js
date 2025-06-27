const mongoose = require('mongoose');
const { calcularTasa, calcularCuota, calcularAmortizacion } = require('../services/calculosFinancieros');
const Schema = mongoose.Schema;

const simulacionSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    identificacion: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, match: /.+\@.+\..+/ },
    telefono: { type: String, required: true, trim: true, match: /^\d{7,15}$/ },
    direccion: { type: String, required: true, trim: true },
    monto: { type: Number, required: true, min: 1000000, max: 20000000 },
    tasa: { type: Number, required: true, enum: [5, 10, 20, 30] },
    plazo: { type: Number, required: true, enum: [48, 64, 84] },
    fechaNacimiento: { type: String, required: true },
    cuota: { type: Number },
    totalPagar: { type: Number },
    interesTotal: { type: Number },
    amortizacion: { type: Array },
    fechaSimulacion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Simulacion = mongoose.model('Simulacion', simulacionSchema);

async function simular(datosSimulacion) {
    const { nombre, identificacion, email, telefono, direccion, monto, plazo, tasa, fechaNacimiento } = datosSimulacion;

    const cuota = calcularCuota(monto, tasa, plazo);
    const amortizacion = calcularAmortizacion(monto, tasa, plazo, cuota, 0);

    const totalPagar = +(amortizacion.reduce((sum, row) => sum + row.cuotaFija, 0)).toFixed(2);
    const interesTotal = +(totalPagar - monto).toFixed(2);

    const now = new Date();
    const fechaSimulacion = now.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Bogota'
    }).replace(',', '');

    const nuevaSimulacion = new Simulacion({
        nombre,
        identificacion,
        email,
        telefono,
        direccion,
        monto,
        tasa,
        plazo,
        fechaNacimiento,
        cuota,
        totalPagar,
        interesTotal,
        amortizacion,
        fechaSimulacion,
        fecha: now
    });

    const simulacionGuardada = await nuevaSimulacion.save();
    return { ...simulacionGuardada.toObject(), amortizacion };
}

async function obtenerSimulaciones() {
    return await Simulacion.find().sort({ fecha: -1 }).exec();
}

module.exports = {
    simular,
    obtenerSimulaciones,
    Simulacion
};
