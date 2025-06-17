const simuladorModel = require('../models/simuladorModel.js');

const simuladorController = {};

simuladorController.simular = async function (req, res) {
    const { nombre, email, telefono, direccion, monto, plazo, ingresos, edad, ciudad, abonoCapital } = req.body;

    // Validaciones
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'El campo nombre es obligatorio.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'El campo email es obligatorio y debe ser válido.' });
    }
    if (!telefono || typeof telefono !== 'string' || !/^\d{10}$/.test(telefono)) {
        return res.status(400).json({ error: 'El campo teléfono es obligatorio y debe tener 10 dígitos.' });
    }
    if (!direccion || typeof direccion !== 'string' || direccion.trim() === '') {
        return res.status(400).json({ error: 'El campo dirección es obligatorio.' });
    }
    if (monto === undefined || typeof monto !== 'number' || monto < 1000000 || monto > 20000000) {
        return res.status(400).json({ error: 'El monto debe estar entre 1.000.000 y 20.000.000.' });
    }
    if (plazo === undefined || typeof plazo !== 'number' || plazo < 6 || plazo > 120) {
        return res.status(400).json({ error: 'El plazo debe estar entre 6 y 120 meses.' });
    }
    if (edad === undefined || typeof edad !== 'number' || edad < 18 || edad > 65) {
        return res.status(400).json({ error: 'La edad debe estar entre 18 y 65 años.' });
    }
    if (!ciudad || typeof ciudad !== 'string' || ciudad.trim() === '') {
        return res.status(400).json({ error: 'El campo ciudad es obligatorio.' });
    }
    if (abonoCapital !== undefined && (typeof abonoCapital !== 'number' || abonoCapital < 0)) {
        return res.status(400).json({ error: 'El abono de capital debe ser un número positivo o cero.' });
    }

    try {
        const simulacion = await simuladorModel.simular({
            nombre,
            email,
            telefono,
            direccion,
            monto,
            plazo,
            ingresos,
            edad,
            ciudad,
            abonoCapital: abonoCapital || 0
        });
        res.status(201).json(simulacion);
    } catch (error) {
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


