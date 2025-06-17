const mongoose = require('mongoose');
const { calcularTasa, calcularCuota, calcularAmortizacion } = require('../services/calculosFinancieros');
const Schema = mongoose.Schema;

const simulacionSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, match: /.+\@.+\..+/ },
    telefono: { type: String, required: true, trim: true, match: /^\d{10}$/ },
    direccion: { type: String, required: true, trim: true },
    monto: { type: Number, required: true, min: 1000000, max: 20000000 },
    tasa: { type: Number, required: true, min: 0.01, max: 40 },
    plazo: { type: Number, required: true, min: 6, max: 120 },
    edad: { type: Number, required: true, min: 18, max: 65 },
    ciudad: { type: String, required: true, trim: true, enum: [
        'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga',
        'Pereira', 'Santa Marta', 'Manizales', 'Cúcuta', 'Ibagué', 'Neiva',
        'Villavicencio', 'Soledad', 'Montería', 'Sincelejo', 'Valledupar', 'Armenia',
        'Popayán', 'Tunja', 'Riohacha', 'Florencia', 'Quibdó', 'Leticia', 'San Andrés',
        'Mocoa', 'Yopal', 'Puerto Carreño', 'Puerto Asís', 'San José del Guaviare'
    ]},
    cuota: { type: Number },
    totalPagar: { type: Number },
    interesTotal: { type: Number },
    amortizacion: { type: Array },
    fechaSimulacion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Simulacion = mongoose.model('Simulacion', simulacionSchema);

async function simular(datosSimulacion) {
    const { nombre, email, telefono, direccion, monto, plazo, ingresos, edad, ciudad, abonoCapital } = datosSimulacion;
    const tasa = calcularTasa(monto, plazo);
    const cuota = calcularCuota(monto, tasa, plazo);
    const amortizacion = calcularAmortizacion(monto, tasa, plazo, cuota, abonoCapital);

    const totalPagar = +(amortizacion.reduce((sum, row) => sum + row.cuotaFija, 0)).toFixed(2);
    const interesTotal = +(totalPagar - monto).toFixed(2);

    // Formatea la fecha y hora actual con barras
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
        email,
        telefono,
        direccion,
        monto,
        tasa,
        plazo,
        edad,
        ciudad,
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



