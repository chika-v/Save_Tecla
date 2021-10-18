//Importamos los modulos requeridos
const Carrito = require('../../db/db.modelo.carrito')

module.exports.buscarProductos = async ()=> {
  try {
      const productos = await Carrito.findAll()
      return productos
  }catch (error){
      console.log("Error obtener productos en modelo")
      throw new Error (error)
  }
}


module.exports.crearProducto = async (producto)=> {
  try {
      let productoNuevo = await Carrito.create(producto)
      console.log(productoNuevo)
      return productoNuevo
  }catch (error){
      console.log("Error al crear pruducto en carrito")
      throw new Error (error)
  }
}

module.exports.borrarProducto = async (idProducto)=> {
  try {
      let productoBorrado = await Carrito.destroy({where: {id: `${idProducto}`}})
      return productoBorrado
  }catch (error){
      console.log("Error al borrar producto en modelo")
      throw new Error (error)
  }
}