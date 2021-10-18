const midd = require('../../middlewares/midd.usuarios')
const ControladorProductos = require('../Controllers/ProductController.js')

//Exportar los modulos para ser usados.
module.exports = async (app)=>{
    app.get('/inicio', async (req, res) => {
      try {
        console.log('Página principal')
        res.render('inicio')
      } catch(err) {
        res.status(400).json({ message: 'Error cargando la página principal'})
      }
    })

    app.post('/productos', async (req, res) => {
      const producto = req.body
      try {
        const nuevoProducto = await ControladorProductos.addProducto(producto)
        res.status(200).json({ message: "Producto creado exitosamente", producto: nuevoProducto})
      } catch(err) {
        res.status(400).json({ message: 'Error cargando la página principal'})
      }
    })

    app.delete('/productos/:id', async (req, res) => {
      const idProducto = req.params.id
      try {
        const productoBorrado = await ControladorProductos.deleteProduct(idProducto)
        res.status(200).json({ message: 'Producto borrado exitosamente', producto: productoBorrado})
      } catch (err) {
        res.status(400).json({ message: 'Problema borrando al producto', error: err})
      }
    })

    app.get('/productos', async (req, res) => {
      try {
        const productos = await ControladorProductos.obtainProducts()
        res.status(200).json({ message: "Productos obtenidos exitosamente", productos})
      } catch(err) {
        res.status(400).json({ message: 'Error obteniendo productos', err})
      }
    })

}