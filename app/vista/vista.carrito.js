const midd = require('../../middlewares/midd.usuarios')
const ControladorCarrito = require('../Controllers/CarritoController.js')

//Exportar los modulos para ser usados.
module.exports = async (app)=>{
    app.get('/carrito', async (req, res) => {
      try {
        console.log('carrito')
        res.render('carrito')
      } catch(err) {
        res.status(400).json({ message: 'Error cargando el carrito'})
      }
    })

    app.post('/carrito', async (req, res) => {
      const producto = req.body
      try {
        const nuevoProducto = await ControladorCarrito.addProducto(producto)
        res.status(200).json({ message: "Producto creado exitosamente en carrito", producto: nuevoProducto})
      } catch(err) {
        res.status(400).json({ message: 'Error agregando producto al carrito'})
      }
    })

    app.delete('/carrito/:id', async (req, res) => {
      const idProducto = req.params.id
      try {
        const productoBorrado = await ControladorCarrito.deleteProduct(idProducto)
        res.status(200).json({ message: 'Producto borrado exitosamente del carrito', producto: productoBorrado})
      } catch (err) {
        res.status(400).json({ message: 'Problema borrando al producto del carrito', error: err})
      }
    })

    app.get('/carrito/all', async (req, res) => {
      try {
        const productos = await ControladorCarrito.obtainProducts()
        res.status(200).json({ message: "Productos del carrito obtenidos exitosamente", productos})
      } catch(err) {
        res.status(400).json({ message: 'Error obteniendo productos', err})
      }
    })

}
