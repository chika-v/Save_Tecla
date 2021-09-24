const librosServices = require('../services/products.services')

module.exports = (app)=> {

    app.get('/products', async (req,res)=>{
        try {
            let resultado = await productsServices.listarProducts();
            res.json(resultado)
        }catch (err){
            console.log(err.message)
            res.status(500).json({error : err.message})
        }
    })

    app.post('/products', async (req,res)=>{
        let product = req.body
        console.log(product)
        try {
            let resultado = await productsServices.nuevoProduct(product)
            console.log(resultado)
            res.json(resultado)
        }catch (err){
            console.log(err.message)
            res.status(500).json({error : err.message})
        }
    })
}