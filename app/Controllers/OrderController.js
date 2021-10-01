const Pedido = require("../Models/OrderModel");

//Exportamos nuestros Modulos

module.exports.OrderController = async (data) => {
  try {
    let pedido = new Pedido(data);
    console.log(pedido);
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error(err);
  }
};
