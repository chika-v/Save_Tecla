const sequelize = require("../../db/db.conexion");

module.exports = class User {
  constructor(usuario) {
    const {
      idUsuario,
      nombre,
      telefono,
      apellidos,
      fechaNac,
      fechaAlta,
      correo,
      token,
      rol,
      contraseña
    } = usuario;
    this.idUsuario = idUsuario || "";
    this.nombre = nombre || "";
    this.apellidos = apellidos || "";
    this.fechaNac = fechaNac || new Date();
    this.fechaAlta = fechaAlta || new Date();
    this.correo = correo || "";
    this.token = token || "";
    this.telefono = telefono;
    this.rol = rol || "estandar";
    this.pass = contraseña || "";
  }

  async insertUser(req, res, next) {
    try {
      const INSERT_USER = `INSERT INTO usuarios
      (idusuario, nombre, apellidos, fechaNac, fechaAlta, correo, token, telefono, rol, pass)
        VALUES
        (:idusuario, :nombre, :apellidos, :fechaNac, :fechaAlta, :correo, :token, :telefono, :rol, :pass)`;
      const result = await sequelize.query(INSERT_USER, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          idusuario: this.idUsuario,
          nombre: this.nombre,
          apellidos: this.apellidos,
          fechaNac: this.fechaNac.toISOString().slice(0, 19).replace("T", " "),
          fechaAlta: this.fechaAlta
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          correo: this.correo,
          token: this.token,
          telefono: this.telefono,
          rol: this.rol,
          pass: this.pass
        },
      });
      return result
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const SELECT_ALL = `SELECT * FROM usuarios where correo = :correo AND pass = :pass`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          correo: this.correo,
          pass: this.pass
        },
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  }

  async deleteUser() {
    try {
      const SELECT_ALL = `UPDATE usuario SET activo = 0 WHERE correo = :correo`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          correo: this.correo,
        },
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  }
};
