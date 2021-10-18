//Importo los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./db.conexion')

//Defino los modelos de DB que voy a utilizar

const Usuarios = sequelize.define('usuarios' , {
    nombres : {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    pass : {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(200),
        default: ''
    }
}, {
    // Inserta los timestamps automáticamente al crear la tabla
    timestamps: true
})

module.exports = Usuarios