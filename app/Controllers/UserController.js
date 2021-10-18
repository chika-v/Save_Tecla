//Importamos los modulos necesarios
const jwt = require('jsonwebtoken')
const modeloUsuarios = require('../Models/UserModel.js')

module.exports.generaToken = async (data)=> {
  const resultado = jwt.sign({
      data} , process.env.SECRET_KEY 
  ) //Tiempo maximo 15 minutos de validez
  return resultado
}

module.exports.verificarUsuario = async (token)=> {
  const resultado = jwt.verify(token, process.env.SECRET_KEY)

  if(resultado){
      return resultado
  }else {
      throw new Error ('Token no valido!')
  }
}

module.exports.findUser = async (usuario)=> {
  try {
      let result = await modeloUsuarios.encontrarUsuario(usuario)
      return result
  }catch (error) {
      console.log("Error al encontrar usuario en controlador", error)
      throw new Error (error)
  }
}

module.exports.deleteUser = async (idUsuario)=> {
  try {
      let result = await modeloUsuarios.borrarUsuario(idUsuario)
      return result
  }catch (error) {
      console.log("Error al borrar usuario en controlador", error)
      throw new Error (error)
  }
}


module.exports.addUser = async (usuario)=> {
  try {
      let result = await modeloUsuarios.crearUsuario(usuario)
      return result
  }catch (error) {
      console.log("Error al crear usuario en controlador", error)
      throw new Error (error)
  }
}