module.exports = {
    HOST: "localhost",
    USER: "sa",
    PASSWORD: "Mermelada27",
    DB: "tecla_site",
    dialect: "mssql",
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };