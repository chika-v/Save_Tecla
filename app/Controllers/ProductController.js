const Producto = require("../Models/ProductModel");

//Exportamos nuestros Modulos

module.exports.addProducto = async (data) => {
  try {
    let producto = new Producto(data);
    producto.insertProduct(data);
    console.log(producto);
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.getProductos = async () => {
  try {
    let producto = new Producto();
    const res = await producto.getProducts();
    return res;
  } catch (err) {
    console.log("Error obteniendo productos" + err);
    throw new Error(err);
  }
};

module.exports.getProducto = async (data) => {
  try {
    let producto = new Producto(data);
    const res = await producto.getProduct();
    return await res;
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error(err);
  }
};
