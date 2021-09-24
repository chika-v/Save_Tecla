const productController = require('../controller/productsController')
const autentication = require('../middleware/autentication')

module.exports = async (app) => {
    app.get('/products',autentication.userAutentication,async(req,res) => {
        const result = await productController.listProducts();
        res.send(result);
    });

    app.get('/product/:id',async(req,res) => {
        let productId = req.params.id
        res.send(await productController.findProduct(productId));
    });
};