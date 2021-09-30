const sequelize = require("../db/db.conexion");

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
  }

  async insertUser(req, res, next) {
    try {
      const INSERT_USER = `INSERT INTO usuario
      (nombre, apellidos, fechaNac, fechaAlta, correo, token, telefono, rol)
        VALUES
        (:nombre, :apellidos, :fechaNac, :fechaAlta, :correo, :token, :telefono, :rol)`;
      await sequelize.query(INSERT_USER, {
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
          telefono: this.telefono,
          rol: this.rol,
        },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const SELECT_ALL = `SELECT * FROM usuario where correo = :correo and activo = 1`;
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
