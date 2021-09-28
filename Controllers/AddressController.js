const Direccion = require("../Models/AddressModel");

//Exportamos nuestros Modulos

module.exports.addAddress = async (data) => {
  try {
    let direccion = new Direccion(data);
    direccion.insertAddress(data);
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error({ error: err.message });
  }
};

module.exports.getAddress = async (data) => {
  try {
    let direccion = new Direccion(data);
    const res = await direccion.getAddress(data);
    console.log(res)
  } catch (err) {
    console.log("Error desde el modelo" + err);
    throw new Error({ error: err.message });
  }
};