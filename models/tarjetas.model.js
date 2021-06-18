module.exports = (sequelize, Sequelize) => {
    const Tarjetas = sequelize.define("tarjetas", {
      idTarjeta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero:{
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      vencimiento: {
        type: Sequelize.STRING
      },
      cvv: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      }
    },{
        timestamps:false
    });

    return Tarjetas;
  };