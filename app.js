//Importo los modulos necesarios
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const user = require("./Controllers/UserController");
const address = require("./Controllers/AddressController");
const product = require("./Controllers/ProductController");
const jwt = require("jsonwebtoken");
const sequelize = require("./db/db.conexion");
const circularJSON = require("circular-json");
//Middleware globales
app.use(express.json());
app.use(cors());

// Configuraciones globales
// app.use(express.static(__dirname + '/public'))
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')

//Levantamos nuestro servidor
async function inicioServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión estabilizada correctamente");
    app.listen(process.env.PORT, function () {
      console.log(
        `Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.error(
      "No se pudo conectar correctamebte con la Base de datos:",
      error
    );
  }
}
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get("/", async function (req, res) {
  res.send("hola");
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/insertUser", async (req, res, next) => {
  try {
    const us = await user.addUser(req, res, next);
    res.send(us);
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get("/validationLogin", async (req, res, next) => {
  try {
    const us = await user.validationLogin(req, res, next);
    res.send(us);
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.delete("/deleteUser", async (req, res, next) => {
  try {
    const us = await user.deleteUser(req, res, next);
    res.send(us);
  } catch (e) {
    console.log(e);
    res.send({ error: e.message });
  }
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/insertProduct", async (req, res, next) => {
  const pr = await product.addProducto(req, res, next);
  res.send(pr);
});
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
async function agregarAuxiliar() {
  let usuario = {
    nombre: "Miguel Angel",
    apellidos: "Rodriguez Gonzalez",
    fechaNac: new Date(1998, 07, 20),
    fechaAlta: new Date(),
    correo: "m.angelrg2008@gmail.com",
    token: jwt.sign(
      { correo: "m.angelrg2008@gmail.com", contraseña: "alucard138" },
      `${process.env.KEY_TOKEN}`
    ),
    contraseña: "alucard138",
    telefono: "5514010696",
    rol: "estandar",
  };

  let direccion = {
    calle: "",
    colonia: "Santa María Chimalhuacán",
    numeroExt: "13",
    numeroInt: "",
    municipio: "Chimalhuacán",
    cp: "56330",
    estado: "México",
    referencia: "A un costado del bancomer",
    pais: "México",
    idUsuario: -1,
  };

  let producto = {
    idProducto: 1,
    nombre: "Paleta de sombra de ojos de 32 colores",
    stock: 10,
    precio: 1500,
    costo: 1000,
    descripcion: "Sobra para ojos de 32 colores diferentes",
    descuento: 0,
    fechaAlta: new Date(),
    categoria: "Cosmeticos",
  };

  //Agregamos a un usuario
  //user.addUser(usuario);

  //Obtenemos el usuario
  //const res = await user.getUser(usuario);
  //console.log(res);

  //Asignamos el id del usuario a la direccion
  //direccion.idUsuario = res.idUsuario;

  //Agregamos la direccion
  //address.addAddress(direccion);

  //Obtenemos las direcciones ligadas al usuario
  //address.getAddress(direccion);

  //Validar un inicio de sesion
  //user.validationLogin(data);

  //Agregamos un producto
  //product.addProducto(producto);

  //Obtiene un producto dependiendo del ID
  // const res = await product.getProductos(producto);
  // console.log(res);

  //Obtiene todos los productos
  // const res = await product.getProductos();
  // console.log(res)
}

inicioServer();
agregarAuxiliar();

// Usamos routes
// vistaProductos(app)
// vistaTienda(app)
