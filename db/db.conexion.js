const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, null, null, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,
  port: 1433,

  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: true,
        userName: dbConfig.USER,
        password: dbConfig.PASSWORD
      }
    },
  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
