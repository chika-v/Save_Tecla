//Importo los modulos necesarios
const {DataTypes } = require('sequelize');
const sequelize = require('./db.conexion')

//Defino los modelos de DB que voy a utilizar

const Productos = sequelize.define('productos' , {
    title : {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    categorie_id: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
}, {
    // Inserta los timestamps automáticamente al crear la tabla
    timestamps: true
})

module.exports = Productos