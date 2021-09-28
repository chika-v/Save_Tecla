const sequelize = require("../db/db.conexion");

module.exports = class User {
  constructor(usuario) {
    const { idUsuario, nombre, telefono, apellidos, fechaNac, fechaAlta, correo, token } =
      usuario;
    this.idUsuario = idUsuario || "";
    this.nombre = nombre || "";
    this.apellidos = apellidos || "";
    this.fechaNac = fechaNac || new Date();
    this.fechaAlta = fechaAlta || new Date();
    this.correo = correo || "";
    this.token = token || "";
    this.telefono = telefono;
  }

  async insertUser() {
    try {
      const INSERT_USER = `INSERT INTO usuario
      (nombre, apellidos, fechaNac, fechaAlta, correo, token, telefono)
        VALUES
        (:nombre, :apellidos, :fechaNac, :fechaAlta, :correo, :token, :telefono)`;
      const result = await sequelize.query(INSERT_USER, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          nombre: this.nombre,
          apellidos: this.apellidos,
          fechaNac: this.fechaNac.toISOString().slice(0, 19).replace("T", " "),
          fechaAlta: this.fechaAlta
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          correo: this.correo,
          token: this.token,
          telefono: this.telefono
        },
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const SELECT_ALL = `SELECT * FROM usuario where correo = :correo`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
        replacements:{
          correo: this.correo
        }
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
