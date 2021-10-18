//IMPORTO LOS MODULOS NECESARIOS
const Joi = require('joi');
const { modelologin, modeloCrearUsuario } = require('./midd.modeloUsuarios');

module.exports.validarLogin = async (req,res,next)=>{
    try {
        await Joi.attempt(req.body, modelologin, 'Alguno de los datos no es correcto')
        return next()
    }catch(error){
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports.validarDatosDeUsuario = async (req, res, next) =>{
    try {
        await Joi.attempt(req.body, modeloCrearUsuario, 'Alguno de los datos no es correcto')
        return next()
    }catch(error){
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports.validarTokenUsuario = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await servicesUsuarios.verificarUsuario(token)
            console.log(verificado)
            return next()
        }else{
            throw new Error ('Requiere autenticación con JWT')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}