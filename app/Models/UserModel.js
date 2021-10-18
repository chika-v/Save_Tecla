//Importamos los modulos requeridos
const Usuarios = require('../../db/db.modelo.usuarios')


//Exportamos los modulos

module.exports.encontrarUsuario = async (usuario)=> {
  try {
      let usuarioEncontrado = await Usuarios.findOne({where: {usuario: `${usuario.usuario}`, pass: `${usuario.pass}`}})
      console.log(usuarioEncontrado)
      return usuarioEncontrado
  }catch (error){
      console.log("Error al encontrar usuario en modelo")
      throw new Error (error)
  }
}

module.exports.crearUsuario = async (usuario)=> {
  try {
      let usuarioNuevo = await Usuarios.create(usuario)
      console.log(usuarioNuevo)
      return usuarioNuevo
  }catch (error){
      console.log("Error al crear usuario en modelo")
      throw new Error (error)
  }
}

module.exports.borrarUsuario = async (idUsuario)=> {
  try {
      let usuarioBorrado = await Usuarios.destroy({where: {id: `${idUsuario}`}})
      return usuarioBorrado
  }catch (error){
      console.log("Error al borrar usuario en modelo")
      throw new Error (error)
  }
}