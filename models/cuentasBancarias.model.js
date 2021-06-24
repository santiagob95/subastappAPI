module.exports = (sequelize, Sequelize) => {
    const CuentasBancarias = sequelize.define("cuentasBancarias", {
      idCuentaBancaria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cbu:{
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      cuil: {
        type: Sequelize.STRING
      },
      alias: {
        type: Sequelize.STRING
      },
      estado:{
        type: Sequelize.STRING
      }
    },{
        timestamps:false
    });

    return CuentasBancarias;
  };