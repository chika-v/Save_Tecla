const sequelize = require("../../db/db.conexion");

module.exports = class Address {
  constructor(direccion) {
    const {
      calle,
      colonia,
      numeroExt,
      numeroInt,
      municipio,
      cp,
      estado,
      referencia,
      pais,
      idUsuario,
    } = direccion;
    this.calle = calle || "";
    this.colonia = colonia || "";
    this.numeroInt = numeroInt || "";
    this.numeroExt = numeroExt || "";
    this.municipio = municipio || "";
    this.cp = cp || "";
    this.estado = estado || "";
    this.referencia = referencia || "";
    this.pais = pais || "";
    this.idUsuario = idUsuario || "";
  }

  async insertAddress() {
    try {
      const INSERT_USER = `INSERT INTO direccion 
        (calle, colonia, numeroInt, numeroExt, municipio, 
            cp, estado, referencia, pais, idUsuario) 
        VALUES 
(:calle, :colonia, :numeroInt, :numeroExt, 
  :municipio, :cp, :estado, :referencia, :pais, :idUsuario)`;
      const result = await sequelize.query(INSERT_USER, {
        replacements: {
          calle: `${this.calle}`,
          colonia: `${this.colonia}`,
          numeroInt: `${this.numeroInt}`,
          numeroExt: `${this.numeroExt}`,
          municipio: `${this.municipio}`,
          cp: `${this.cp}`,
          estado: `${this.estado}`,
          referencia: `${this.referencia}`,
          pais: `${this.pais}`,
          idUsuario: this.idUsuario,
        },
        type: sequelize.QueryTypes.INSERT,
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAddress() {
    try {
      const SELECT_ALL = `SELECT * FROM direccion where idUsuario = :idUsuario`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idUsuario: this.idUsuario,
        },
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
