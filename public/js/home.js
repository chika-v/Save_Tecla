//-----------------------------------------------------------------------------
let products = document.getElementById("products");
//-----------------------------------------------------------------------------
async function traerProductos() {
  const url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1144";
  const response = await fetch(url);
  const parsedResponse = await response.json();
  return parsedResponse;
}
//-----------------------------------------------------------------------------
async function addCar(a) {
  const { title, id, thumbnail, price } = a;
  const insertCar = await fetch('http://localhost:3000/carrito', {
    method: 'POST',
    headers: {"Content-type": "application/json;charset=UTF-8"},
    body: JSON.stringify({
      title,
      price,
      img: thumbnail,
      categorie_id: id,
    })
  });
  const parsedProducto = await insertCar.json()
  if (parsedProducto.producto) {
    alert('Producto agregado con éxito a la tabla carrito en la db')
  } else {
    alert('hubo un error creando producto')
  }
}
//-----------------------------------------------------------------------------
async function deleteCar(a) {
  const { title, id } = a;
  let carrito = JSON.parse(await localStorage.getItem("car")) || [];
  let pos = carrito.findIndex((art) => art.id === id);
  let msg = "eliminado";
  const { cantidad } = carrito[pos];
  if (cantidad - 1 > 0) {
    carrito.splice(pos, 1, {
      ...carrito[pos],
      cantidad: cantidad - 1,
    });
    msg = "actualizado";
  } else if (cantidad - 1 === 0) {
    carrito.splice(pos, 1);
  }
  alert(`${title} ${msg} correctamente.`);
  localStorage.setItem("car", JSON.stringify(carrito));
  retornarCantidad(id);
}
//-----------------------------------------------------------------------------
const retornarCantidad = (id) => {
  let carrito = JSON.parse(localStorage.getItem("car")) || [];
  let pos = carrito.findIndex((art) => art.id === id);
  let valor = 0;
  if (pos > -1) {
    const { cantidad } = carrito[pos];
    valor = cantidad;
  }
  document.getElementById("cantidad-" + id).innerHTML = valor;
};

const cantidad = (id) => {
  let carrito = JSON.parse(localStorage.getItem("car")) || [];
  let pos = carrito.findIndex((art) => art.id === id);
  let valor = 0;
  if (pos > -1) {
    const { cantidad } = carrito[pos];
    valor = cantidad;
  }
  return valor;
};
//-----------------------------------------------------------------------------
async function mostrarProductos() {
  const productos = await traerProductos();
  const { results } = productos;
  results.map((doc) => {
    const { thumbnail, title, price, id } = doc;
    var contenedor = document.createElement("div");
    contenedor.setAttribute("class", "producto_individual");
    let producto = `
        <div class="card" style="width: 18rem; margin-top: 20px;">
            <img src="${thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">$${price}</p>
                <button class="btn btn-primary" onclick='addCar(${JSON.stringify(
                  doc
                )})'><i class="fas fa-plus"></i>
                </button>
                <p class="card-text" id="cantidad-${id}">${cantidad(id)}</p>
                <button class="btn btn-secondary" style="wid" onclick='deleteCar(${JSON.stringify(
                  doc
                )})'><i class="fas fa-minus"></i></button>
            </div>
        </div>`;
    contenedor.innerHTML += producto;
    products.appendChild(contenedor);
  });
}
//-----------------------------------------------------------------------------
mostrarProductos();
//-----------------------------------------------------------------------------
async function traerCategorias() {
  const url = "https://api.mercadolibre.com/categories/MLM1144";
  const response = await fetch(url);
  const parsedResponse = await response.json();
  return parsedResponse;
}
//-----------------------------------------------------------------------------
let listaDeCategorias = document.getElementById("videojuegos");
//-----------------------------------------------------------------------------
async function mostrarCategorias() {
  const categorias = await traerCategorias();
  const { children_categories } = categorias;
  children_categories.map((doc, x) => {
    const { name } = doc;
    var contenedor = document.createElement("p");
    contenedor.setAttribute("id", "c" + x);
    contenedor.setAttribute("class", "sub_categoria");
    contenedor.textContent = name;
    listaDeCategorias.appendChild(contenedor);
  });
}
//-----------------------------------------------------------------------------
mostrarCategorias();
//----------------------------------------------------------------------------