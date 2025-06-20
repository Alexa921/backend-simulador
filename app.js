const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const config = require('./config.js').config;
const rutas = require('./routes.js');
const simulacionGraficosRoutes = require('./src/routes/simulacionGraficosRoutes.js');

dotenv.config();

const app = express();

app.use(cors({
    origin: function(origin, callback){
        if(!origin){
            return callback(null, true);
        }
        if(config.listablanca.indexOf(origin) === -1){
            return callback('Error de CORS no tiene permiso para:' + origin, false);
        } else {
            return callback(null, true);
        }
    },
    credentials: true,
}));

app.use(express.json()); // Solo este para JSON
app.use('/', rutas);
app.use('/api/graficos', simulacionGraficosRoutes);


// Conexión a la base de datos MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/' + config.db)
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        app.listen(config.puerto, () => {
            console.log('Servidor funcionando por el puerto: ' + config.puerto);
        });
    })
    .catch(err => {
        console.log('Error al conectar a la base de datos', err);
    });


