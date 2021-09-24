const Joi = require('joi')

module.exports = {
    loginModel : Joi.object().keys({
        user: Joi.string().alphanum().min(5).max(12).require(),
        password: Joi.string().min(9).max(50).require(),
        name:Joi.attempt.string().min(1).max(45).require(),
        
    }).with('user','password')
}