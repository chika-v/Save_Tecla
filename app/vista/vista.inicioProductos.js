const ControladorProductos = require('../Controllers/ProductController');

const paginaPrincipal = async (req, res) => {
  try {
    console.log('Página principal')
    res.render('inicio')
  } catch(err) {
    res.status(400).json({ message: 'Error cargando la página principal'})
  }
}

const cargarProductos = async (req, res) => {
  try {
    const productos = await ControladorProductos.getProductos()
    console.log(productos)
    res.status(200).json({ message: 'Productos obtenidos con éxito', productos})
  } catch (err) {
    res.status(400).json({ message: 'Error obteniendo productos', err})
  }
}

const carrito = async (req, res) => {
  try {
    console.log('carrito')
    res.render('carrito')
  } catch(err) {
    res.status(400).json({ message: 'Error cargando carrito'})
  }
}

module.exports = {
  cargarProductos,
  paginaPrincipal,
  carrito
}