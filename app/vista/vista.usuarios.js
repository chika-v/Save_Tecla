const ControladorUsuarios = require('../Controllers/UserController')

const login = async (req, res) => {
  try {
    console.log(`Renderizando el login`)
    res.render('login')
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Error en el ingreso al login", error: err})
  }
}

const crearUsuario = async (req, res) => {
  const usuario = req.body
  try {
    const usuarioNuevo = await ControladorUsuarios.addUser(usuario)
    res.status(200).json({ message: 'Usuario creado exitosamente', usuario: usuarioNuevo})
  } catch (err) {
    res.status(400).json({ message: 'Hubo un error creando el usuario', error: err})
  }
}

const buscarUsuario = async (req, res) => {
  const datosDelUsuario = req.body 
  try {
    const usuario = await ControladorUsuarios.getUser(datosDelUsuario)
    console.log("Está corriendo")
    console.log(usuario)
    if (usuario.length >= 1 ) {
      res.status(200).json({ success: true, message: 'Usuario encontrado con éxito', usuario: usuario})
    } else {
      res.status(300).json({ success: false, message: 'Usuario no encontrado', usuario: usuario})
    }
  } catch(err) {
    console.log(err)
    res.status(400).json({ message: 'Hubo un error buscando al usuario', error: err})
  }
}

module.exports = {
  login,
  crearUsuario,
  buscarUsuario
}