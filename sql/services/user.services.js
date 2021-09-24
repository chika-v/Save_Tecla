const sequelize = require('../db/conexion')


module.exports.nuevoUser = async (user)=> {
    try {
        let resultado = await sequelize.query(`INSERT INTO user (nombres , apellidos) VALUES (?,?)`,
        {replacements: user, type: sequelize.QueryTypes.SELECT});
        console.log(resultado)
        return 'Alta de user correctamente'
    }catch (error) {
        console.log(error)
        throw new Error ("Ocurrio un error en la consulta");
    }
}

module.exports.listarUser = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM user')
        return resultado
    }catch (error){
        console.log(error)
        throw new Error ("Ocurrio un error en la consulta");
    }
}