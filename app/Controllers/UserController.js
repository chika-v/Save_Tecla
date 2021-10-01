const Usuario = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.addUser = async (data) => {
  try {
    let usuario = new Usuario(data);
    const nuevoUsuario = await usuario.insertUser();
    return nuevoUsuario
  } catch (err) {
    console.log("El usuario no pudo ser creado" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.getUser = async (data) => {
  try {
    let usuario = new Usuario(data);
    const res = await usuario.getUser();
    return await res[0];
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.validationLogin = async (data) => {
  try {
    let usuario = new Usuario(data);
    const res = await usuario.getUser();
    const { token } = res[0];
    const session = jwt.verify(token, `${process.env.KEY_TOKEN}`);
    const { correo, contraseña } = session;
    if (data.correo == correo && contraseña == data.contraseña)
      console.log("Sesion iniciada");
    else console.log("Usuario o contraseña incorrecto");
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error({ error: err.message });
  }
};
