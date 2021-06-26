module.exports = (sequelize, Sequelize) => {
    const RegistroSubasta = sequelize.define("registrosSubasta", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  //    subastaID: {
  //      type: Sequelize.INTEGER
  //    },
  //    duenioID: {
  //      type: Sequelize.INTEGER
  //    },
   //   productoID: {
  //      type: Sequelize.INTEGER
 //    },
   //   clienteID: {
  //      type: Sequelize.INTEGER
  //    },
      importe: {
        type: Sequelize.FLOAT
      },
      comision: {
        type: Sequelize.FLOAT
      },

    },{
        timestamps:false
    });

    return RegistroSubasta;
  };