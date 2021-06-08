module.exports = (sequelize, Sequelize) => {
    const Productos = sequelize.define("productos", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: Sequelize.STRING
      },
      disponible: {
        type: Sequelize.STRING,
        validate:{
            isIn: [['si', 'no']]
            }
      },
      descripcionCatalogo: {
        type: Sequelize.STRING,
        defaultValue: "No posee"
      },
      descripcionCompleta: {
        type: Sequelize.STRING
      },
      revisor: {
        type: Sequelize.INTEGER
      },
      duenio: {
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING
      },

    },{
        timestamps:false
    });

    return Productos;
  };