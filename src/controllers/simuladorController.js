const simuladorModel = require('../models/simuladorModel.js');

const simuladorController = {};

simuladorController.simular = async function (req, res) {
    const { nombre, identificacion, email, telefono, direccion, monto, plazo, tasa, fechaNacimiento } = req.body;

    // Validaciones
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'El campo nombre es obligatorio.' });
    }
    if (!identificacion || typeof identificacion !== 'string' || identificacion.trim() === '') {
        return res.status(400).json({ error: 'El campo identificación es obligatorio.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'El campo email es obligatorio y debe ser válido.' });
    }
    if (!telefono || typeof telefono !== 'string' || !/^\d{7,15}$/.test(telefono)) {
        return res.status(400).json({ error: 'El campo teléfono es obligatorio y debe tener entre 7 y 15 dígitos.' });
    }
    if (!direccion || typeof direccion !== 'string' || direccion.trim() === '') {
        return res.status(400).json({ error: 'El campo dirección es obligatorio.' });
    }
    if (monto === undefined || typeof monto !== 'number' || monto < 1000000 || monto > 20000000) {
        return res.status(400).json({ error: 'El monto debe estar entre 1.000.000 y 20.000.000.' });
    }
    if (plazo === undefined || typeof plazo !== 'number' || ![48, 64, 84].includes(plazo)) {
        return res.status(400).json({ error: 'El plazo debe ser 48, 64 o 84 meses.' });
    }
    if (tasa === undefined || typeof tasa !== 'number' || ![5, 10, 20, 30].includes(tasa)) {
        return res.status(400).json({ error: 'La tasa debe ser 5, 10, 20 o 30.' });
    }
    if (!fechaNacimiento || typeof fechaNacimiento !== 'string') {
        return res.status(400).json({ error: 'El campo fecha de nacimiento es obligatorio.' });
    }

    try {
        const simulacion = await simuladorModel.simular({
            nombre,
            identificacion,
            email,
            telefono,
            direccion,
            monto,
            plazo,
            tasa,
            fechaNacimiento
        });
        res.status(201).json(simulacion);
    } catch (error) {
        console.error('ERROR:', error);  
        res.status(500).json({ error: 'Error al guardar la simulación', detalle: error.message });
    }
};
simuladorController.obtenerSimulaciones = async function (req, res) {
    try {
        const simulaciones = await simuladorModel.obtenerSimulaciones();
        res.status(200).json(simulaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener simulaciones', detalle: error.message });
    }
};

module.exports = { simuladorController };
