const Usuario = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.addUser = async (req, res, next) => {
  try {
    const { nombre, telefono, apellidos, fechaNac, correo, rol, contraseña } =
      req.body;
    if (nombre === "") {
      res
        .status(400)
        .json({ message: "El campo nombre está vacío.", code: 400 });
    }
    if (telefono === "" || telefono.length !== 10 || isNaN(telefono)) {
      return res
        .status(400)
        .json({ message: "El número de teléfono no es válido.", code: 400 });
    }
    if (apellidos === "") {
      return res
        .status(400)
        .json({ message: "El campo apellidos está vacío.", code: 400 });
    }
    if (fechaNac === "") {
      return res
        .status(400)
        .json({ message: "El campo fecha nacimiento está vacío.", code: 400 });
    }
    if (
      correo === "" ||
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        correo || !correo
      )
    ) {
      res
        .status(400)
        .json({ message: "El correo electrónico no es válido.", code: 400 });
      return;
    }
    if (contraseña === "" || !contraseña) {
      res
        .status(400)
        .json({ message: "El campo contraseña está vacío.", code: 400 });
      return;
    }
    if (rol === "") {
      data.rol = "estandar";
    }
    const f = fechaNac.split("/");
    req.body.fechaNac = new Date(f[2], f[1] - 1, f[0]);
    req.body.token = jwt.sign(
      { correo, contraseña },
      `${process.env.KEY_TOKEN}`
    );
    let usuario = new Usuario(req.body);
    const r = await usuario.getUser();
    if (r.length !== 0) {
      res
        .status(400)
        .json({ message: "Correo electronico ya registrado.", code: 400 });
      return;
    }
    await usuario.insertUser(req, res, next);
    res
      .status(200)
      .json({ message: "Usuario registrado correctamente", code: 200 });
    return;
  } catch (e) {
    //console.log(e)
    res.status(400).json({ message: "Ha ocurrido un error " + e, code: 400 });
    return;
  }
};

module.exports.getUser = async (usuario) => {
  try {
    let user = new Usuario(usuario);
    const r = await user.getUser();
    return r
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    let usuario = new Usuario(req.body);
    const r = await usuario.deleteUser();
    res
      .status(200)
      .json({ message: "Usuario eliminado correctamente.", code: 200 });
    return;
  } catch (e) {
    res.status(400).json({ message: "Ha ocurrido un error " + e, code: 400 });
    return;
  }
};

module.exports.validationLogin = async (req, res, next) => {
  try {
    const { correo, contraseña } = req.body;
    if (
      correo === "" ||
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        correo
      )
    ) {
      res
        .status(400)
        .json({ message: "El correo electrónico no es válido.", code: 400 });
      return;
    }
    if (contraseña === "") {
      res
        .status(400)
        .json({ message: "El campo contraseña está vacío.", code: 400 });
      return;
    }
    let usuario = new Usuario(req.body);
    const r = await usuario.getUser();
    if (r[0]) {
      const { token } = r[0];
      const session = jwt.verify(token, `${process.env.KEY_TOKEN}`);
      const { correo, contraseña } = session;
      if (req.body.correo == correo && contraseña == req.body.contraseña) {
        res.status(200).json({
          message: "Sesion iniciada correctamente",
          code: 200,
          idUsuario: r[0].idUsuario,
          correo: correo,
          token: token,
        });
        return;
      } else {
        res
          .status(400)
          .json({ message: "Usuario o contraseña incorrecto", code: 400 });
        return;
      }
    } else {
      res.status(400).json({ message: "Usuario no encontrado", code: 400 });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: "Ha ocurrido un error " + e, code: 400 });
    return;
  }
};
