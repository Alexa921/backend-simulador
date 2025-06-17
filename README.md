# 📊 Simulador de Créditos Educativos - Backend

Este módulo permite simular un crédito educativo con base en los datos personales del usuario, generando una tabla de amortización y guardando los resultados en MongoDB.

## 🧩 Estructura del proyecto

backendSimulador/
│
├── app.js
├── config.js
├── routes.js
└── src/
    ├── controllers/
    │   └── simuladorController.js
    └── models/
        └── simuladorModel.js



### 1. Modelo de Simulación (`simuladorModel.js`)

Este archivo define el esquema y las funciones principales del simulador.

#### Esquema (`simulacionSchema`)

Define los campos que se guardan en la base de datos:

- `nombre`: *String*, requerido.
- `monto`: *Number*, entre 1.000.000 y 20.000.000.
- `tasa`: *Number*, calculada automáticamente (entre 0.01% y 40% anual).
- `plazo`: *Number*, entre 6 y 120 meses.
- `edad`: *Number*, entre 18 y 65 años.
- `ciudad`: *String*, debe estar en la lista de ciudades válidas.
- `cuota`: *Number*, cuota mensual calculada.
- `totalPagar`: *Number*, suma total pagada.
- `interesTotal`: *Number*, total pagado en intereses.
- `amortizacion`: *Array*, tabla detallada de cuotas.
- `fecha`: *Date*, fecha de creación automática.

#### Funciones

##### `calcularTasa(monto, plazo)`

Calcula la tasa de interés basada en el monto y plazo usando ponderaciones.

##### `calcularAmortizacion(monto, tasa, plazo, cuota, abonoCapital = 0)`

Devuelve un arreglo con el detalle de cada cuota: saldo inicial, intereses, abono a capital, cuota fija y saldo final.

##### `simular(datosSimulacion)`

Calcula la simulación completa, guarda en la base de datos y devuelve los datos de la simulación incluyendo la amortización.

##### `obtenerSimulaciones()`

Devuelve las simulaciones almacenadas, ordenadas por fecha descendente.

---

### 2. Controlador (`simuladorController.js`)

Define las rutas y lógica de validación para interactuar con el modelo.

#### `simular(req, res)`

Valida los datos del cuerpo (`req.body`) y llama a la función `simular` del modelo.

- Verifica que:
  - El nombre sea válido.
  - El email sea válido.
  - El telefono sea válido.
  - La direccion sea válida.
  - El monto esté dentro del rango permitido.
  - El plazo esté dentro del rango.
  - La ciudad esté definida.
  - El abono a capital (opcional) sea un número positivo o cero.

Si todo está correcto:
- Se calcula la cuota, tasa, amortización, total a pagar e intereses.
- Se guarda en la base de datos y se responde con la simulación completa.

#### `obtenerSimulaciones(req, res)`

Devuelve todas las simulaciones almacenadas en orden descendente por fecha.

---

## 📦 Ejemplo de Respuesta (Simulación)

```json
{
    "nombre": "Brayan",
    "email": "brayan@gmail.com",
    "telefono": "3001234567",
    "direccion": "Calle 123 #45-67",
    "monto": 10000000,
    "tasa": 13.9,
    "plazo": 24,
    "edad": 30,
    "ciudad": "Bogotá",
    "cuota": 479656.55,
    "totalPagar": 11511757.2,
    "interesTotal": 1511757.2,
    "amortizacion": [
        {
            "cuota": 1,
            "saldoInicial": 10000000,
            "interes": 115833.33,
            "cuotaFija": 479656.55,
            "saldoFinal": 9636176.78
        },
        {
            "cuota": 2,
            "saldoInicial": 9636176.78,
            "interes": 111619.05,
            "cuotaFija": 479656.55,
            "saldoFinal": 9268139.28
        },
        ...
    ],
    "fechaSimulacion": "17/06/2025 16:14:34",
    "fecha": "2025-06-17T21:14:34.855Z",
    "_id": "6851daba85de9690f2032494",
    "__v": 0
}
