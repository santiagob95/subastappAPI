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
db.asistentes = require("./asistentes.model")(sequelize, Sequelize);
db.personas = require("./personas.model")(sequelize, Sequelize);
db.itemsCatalogo = require("./itemsCatalogo.model")(sequelize, Sequelize);
db.duenios = require("./duenios.model")(sequelize, Sequelize);
db.subastas = require("./subasta.model")(sequelize, Sequelize);
db.tarjetas = require("./tarjetas.model")(sequelize,Sequelize);
db.cuentasBancarias = require("./cuentasBancarias.model")(sequelize,Sequelize);
db.empleados = require("./empleados.model")(sequelize,Sequelize);
db.personas = require("./personas.model")(sequelize,Sequelize);

module.exports = db;