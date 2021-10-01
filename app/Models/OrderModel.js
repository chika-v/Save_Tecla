const sequelize = require("../../db/db.conexion");

module.exports = class Order {
  constructor(pedido) {
    const {
      idPedido,
      fechaAlta,
      fechaEntrega,
      estatus,
      productos,
      subtotal,
      descuento,
      idUsuario,
      idDireccion,
    } = pedido;
    this.idPedido = idPedido || "";
    this.fechaEntrega = fechaEntrega || new Date();
    this.estatus = estatus || "";
    this.productos = productos || "";
    this.fechaAlta = fechaAlta || new Date();
    this.subtotal = subtotal || "";
    this.descuento = descuento || "";
    this.idUsuario = idUsuario || "";
    this.idDireccion = idDireccion || "";
  }

  async insertOrder() {
    try {
      const INSERT_ORDER = `INSERT INTO dbo.pedido
      (fechaAlta,fechaEntrega,estatus,productos,subtotal,descuento,idUsuario)
        VALUES
      (:fechaAlta,:fechaEntrega,:estatus,:productos,:subtotal,:descuento,:idUsuario)`;
      const result = await sequelize.query(INSERT_ORDER, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          fechaAlta: this.fechaAlta
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        },
        fechaEntrega: this.fechaEntrega
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        estatus: this.estatus,
        productos: this.productos,
        subtotal: this.subtotal,
        descuento: this.descuento,
        idUsuario: this.idDireccion,
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const SELECT_ALL = `SELECT * FROM pedido where idUsuario = :idUsuario`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idUsuario: idUsuario,
        },
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
