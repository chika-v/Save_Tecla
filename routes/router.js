const express = require('express');
const router = express.Router();

const vistasUsuarios = require('../app/vista/vista.usuarios')

// Rutas del MVC
router.get('/', vistasUsuarios.login)
router.post('/signUp', vistasUsuarios.crearUsuario)
router.post('/login', vistasUsuarios.buscarUsuario)

module.exports = router