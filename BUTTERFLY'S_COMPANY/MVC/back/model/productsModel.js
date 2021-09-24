const sequelize = require('../db/conexion');

module.exports = class productsModel {
    constructor(product){
        this.product = product;
    }
    async list (){
        let result = await sequelize.query("SELECT * FROM products");
        return result;
    }
    async find (productId){
        let result = await sequelize.query("SELECT * FROM products WHERE id = " + productId);
        return result;
    }
}