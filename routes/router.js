const express = require('express');
const router = express.Router();

const vistasUsuarios = require('../app/vista/vista.usuarios')
const vistasProductosPrincipal = require('../app/vista/vista.inicioProductos')

// Rutas del MVC
router.get('/', vistasUsuarios.login)
router.post('/signUp', vistasUsuarios.crearUsuario)
router.post('/login', vistasUsuarios.buscarUsuario)

router.get('/inicio', vistasProductosPrincipal.paginaPrincipal)
router.get('/carrito', vistasProductosPrincipal.carrito)

module.exports = router