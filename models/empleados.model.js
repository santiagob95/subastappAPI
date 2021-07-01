module.exports = (sequelize, Sequelize) => {
    const Empleados = sequelize.define("empleados", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cargo: {
        type: Sequelize.INTEGER,
      },
      sector: {
        type: Sequelize.INTEGER,
      },

    },{
        timestamps:false
    });
    return Empleados;
  };