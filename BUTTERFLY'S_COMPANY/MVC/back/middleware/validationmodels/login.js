const Joi = require('joi')

module.exports = {
    loginModel : Joi.object().keys({
        user: Joi.string().alphanum().min(5).max(12).require(),
        password: Joi.string().min(9).max(50).require()
    }).with('user','password')
}