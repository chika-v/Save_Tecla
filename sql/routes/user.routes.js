const autorServices = require('../services/user.services')

module.exports = (app)=> {
    app.get('/user', async (req, res)=>{
        try {
            let resultado = await userServices.listarUser()
            res.json(resultado)
        }catch (err){
            console.log(err.message)
            res.status(500).json({error : err.message}) 
        }
    })
    app.post('/user', async (req,res)=>{
        let user = req.body
        try {
            let resultado = await productsServices.nuevoUser(user)
            console.log(resultado)
            res.json(resultado)
        }catch (err){
            console.log(err.message)
            res.status(500).json({error : err.message})
        }
    })
}