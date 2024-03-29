const modeloProductos = require('../Models/ProductModel.js')

//Exportamos nuestros Modulos

module.exports.obtainProducts = async (producto) => {
  try {
    const productos = await modeloProductos.buscarProductos()
    return productos
  } catch (err) {
    console.log("Error obteniendo productos en el controlador" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.addProducto = async (producto) => {
  try {
    const productoNuevo = await modeloProductos.crearProducto(producto)
    console.log(productoNuevo);
    return productoNuevo
  } catch (err) {
    console.log("Error creando producto en controlador" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.deleteProduct = async (idProducto)=> {
  try {
      let result = await modeloProductos.borrarProducto(idProducto)
      return result
  }catch (error) {
      console.log("Error al borrar producto en controlador", error)
      throw new Error (error)
  }
}

