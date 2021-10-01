const sequelize = require("../../db/db.conexion");

module.exports = class Product {
  constructor(producto) {
    if (producto) {
      const {
        idProducto,
        nombre,
        stock,
        precio,
        costo,
        descripcion,
        descuento,
        fechaAlta,
        categoria
      } = producto;
      this.idProducto = idProducto || "";
      this.nombre = nombre || "";
      this.stock = stock || 0;
      this.precio = precio || 0;
      this.costo = costo || 0;
      this.descripcion = descripcion || "";
      this.descuento = descuento || 0;
      this.fechaAlta = fechaAlta || new Date();
      this.categoria = categoria;
    } else {
      this.idProducto = "";
      this.nombre = "";
      this.stock = 0;
      this.precio = 0;
      this.costo = 0;
      this.descripcion = "";
      this.descuento = 0;
      this.fechaAlta = new Date();
      this.categoria = "Otros";
    }
  }

  async insertProduct() {
    try {
      const INSERT_PRODUCT = `INSERT INTO producto
      (nombre, stock, precio, costo, descripcion,
        descuento, fechaAlta, categoria)
        VALUES
        (:nombre, :stock, :precio, :costo, :descripcion,
          :descuento, :fechaAlta, :categoria)`;
      const result = await sequelize.query(INSERT_PRODUCT, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          nombre: this.nombre,
          stock: this.stock,
          precio: this.precio,
          costo: this.costo,
          descripcion: this.descripcion,
          descuento: this.descuento,
          fechaAlta: this.fechaAlta
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          categoria: this.categoria
        },
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getProducts() {
    try {
      const SELECT_ALL = `SELECT * FROM producto`;
      const result = await sequelize.query(SELECT_ALL, {
        type: sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getProduct() {
    try {
      const SELECT_PRODUCT = `SELECT * FROM producto idProducto = :idProducto`;
      const result = await sequelize.query(SELECT_PRODUCT, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idProducto: this.idProducto,
        },
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
