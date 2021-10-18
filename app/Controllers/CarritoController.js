const modeloCarrito = require('../Models/CarritoModel.js')

//Exportamos nuestros Modulos

module.exports.obtainProducts = async (producto) => {
  try {
    const productos = await modeloCarrito.buscarProductos()
    return productos
  } catch (err) {
    console.log("Error obteniendo productos en el controlador" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.addProducto = async (producto) => {
  try {
    const productoNuevo = await modeloCarrito.crearProducto(producto)
    console.log(productoNuevo);
    return productoNuevo
  } catch (err) {
    console.log("Error creando producto en controlador" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.deleteProduct = async (idProducto)=> {
  try {
      let result = await modeloCarrito.borrarProducto(idProducto)
      return result
  }catch (error) {
      console.log("Error al borrar producto en controlador", error)
      throw new Error (error)
  }
}

