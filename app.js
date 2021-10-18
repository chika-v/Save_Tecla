//Importo los modulos necesarios
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const sequelize = require('./db/db.conexion')
const Usuarios = require('./db/db.modelo.usuarios')
const Productos = require('./db/db.modelo.productos')
const Carrito = require('./db/db.modelo.carrito')
const vistaUsuarios = require('./app/vista/vista.usuarios')
const vistaProductos = require('./app/vista/vista.productos')
const vistaCarrito = require('./app/vista/vista.carrito')

//Middleware globales
app.use(express.json())
app.use(cors())

//Configuraciones globales
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


//Levantamos nuestro servidor
async function inicioServer() {
    try {
        await Usuarios.sync({ alter: true })
        await Productos.sync({ alter: true })
        await Carrito.sync({ alter: true })
        await sequelize.authenticate()
        console.log('Conección estabilizada correctamente');
        app.listen(process.env.PORT, function () {
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        });
      } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
      }
}

inicioServer();
vistaUsuarios(app)
vistaProductos(app)
vistaCarrito(app)