//Importamos los modulos requeridos
const Productos = require('../../db/db.modelo.productos')

module.exports.buscarProductos = async ()=> {
  try {
      const productos = await Productos.findAll()
      return productos
  }catch (error){
      console.log("Error obtener productos en modelo")
      throw new Error (error)
  }
}


module.exports.crearProducto = async (producto)=> {
  try {
      let productoNuevo = await Productos.create(producto)
      console.log(productoNuevo)
      return productoNuevo
  }catch (error){
      console.log("Error al crear usuario en modelo")
      throw new Error (error)
  }
}

module.exports.borrarProducto = async (idProducto)=> {
  try {
      let productoBorrado = await Productos.destroy({where: {id: `${idProducto}`}})
      return productoBorrado
  }catch (error){
      console.log("Error al borrar producto en modelo")
      throw new Error (error)
  }
}