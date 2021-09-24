const sequelize = require('../db/conexion')

module.exports.listarProducts = async ()=> {
    try {
        let resultado = await sequelize.query('SELECT * FROM products');
        console.log(resultado)
        return resultado;
    }catch (error) {
        console.log(error)
        throw new Error ("Ocurrio un error en la consulta");
    }
};

module.exports.nuevoProduct = async (product)=> {
    let productNuevo = [
        product.titulo,
        product.descripcion,
        new Date(product.anio_de_creacion),
        product.user_id
    ]
    console.log(productNuevo)
    try {
        let resultado = await sequelize.query(`INSERT INTO products (titulo, descripcion, anio_de_creacion, user_id) VALUES (?,?,?,?)`,
        {replacements: productNuevo, type: sequelize.QueryTypes.SELECT});
        console.log(resultado)
        return 'alta de products correctamente'
    }catch (error) {
        console.log(error)
        throw new Error ("Ocurrio un error al crear el nuevo product");
    }
}

