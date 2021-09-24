const loginController = require('../controller/loginController')
const {validation} = require('./validationmodels/login')

module.exports = async (app) => {
    app.post('/login',validation.looginValidation ,async(req,res) => {
        let user = req.body;
        res.send(await loginController.login(user));
    });
};