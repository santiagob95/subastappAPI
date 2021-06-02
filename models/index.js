const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.paises = require("./paises.model.js")(sequelize, Sequelize);
db.catalogos = require("./catalogos.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuarios.model.js")(sequelize, Sequelize);
db.registroSubasta = require("./registroSubasta.model")(sequelize, Sequelize);
db.cliente= require("./cliente.model")(sequelize, Sequelize);
db.pujas= require("./pujas.model")(sequelize, Sequelize);
db.productos = require("./productos.model")(sequelize, Sequelize);

module.exports = db;