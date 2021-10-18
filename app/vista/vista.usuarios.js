//Importamos los modulos que vamos a utilizar
const midd = require('../../middlewares/midd.usuarios')
const ControladorUsuarios = require('../Controllers/UserController.js')
const cors = require('cors')

//Exportar los modulos para ser usados.
module.exports = async (app)=>{
    app.get('/login', async (req, res) => {
      try {
        console.log(`Renderizando el login`)
        res.render('login')
      } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Error en el ingreso al login", error: err})
      }
    })

    app.post('/usuario', midd.validarDatosDeUsuario, async (req, res) => {
      const usuario = req.body
      try {
        const usuarioNuevo = await ControladorUsuarios.addUser(usuario)
        res.status(200).json({ message: 'Usuario creado exitosamente', usuario: usuarioNuevo})
      } catch (err) {
        res.status(400).json({ message: 'Hubo un error creando el usuario en la vista', error: err})
      }
    })

    app.post('/ingresar', midd.validarLogin, async (req, res) => {
      const usuario = req.body
      try {
        const usuarioExistente = await ControladorUsuarios.findUser(usuario)

        // Genera token y lo regresa en la respuesta si el usuario existe
        if(usuarioExistente) {
          let validacion = await ControladorUsuarios.generaToken(usuarioExistente)
          res.status(200).json({ message: 'Usuario ingresado exitosamente', token: validacion})
        }
      } catch (err) {
        res.status(400).json({ message: 'Usuario no registrado', error: err})
      }
    })

    app.delete('/usuario/:id', midd.validarLogin, async (req, res) => {
      const idUsuario = req.params.id
      try {
        const usuarioBorrado = await ControladorUsuarios.deleteUser(idUsuario)
        res.status(200).json({ message: 'Usuario borrado exitosamente', usuario: usuarioBorrado})
      } catch (err) {
        res.status(400).json({ message: 'Problema borrando al usuario', error: err})
      }
    })


}