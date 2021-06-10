module.exports = (sequelize, Sequelize) => {
    const RegistroSubasta = sequelize.define("subasta", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING,
        validate:{
            isIn: [['abierta', 'cerrada']]
            }
      },
      subastador: {
        type: Sequelize.INTEGER
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      capacidadAsistentes: {
        type: Sequelize.INTEGER
      },
      tieneDeposito: {
        type: Sequelize.STRING,
        validate:{
            isIn: [['si', 'no']]
            }
      },
      seguridadPropia: {
        type: Sequelize.STRING,        
        validate:{
            isIn: [['si', 'no']]
            }
      },
      categoria: {
        type: Sequelize.STRING,        
        validate:{
            isIn: [['comun', 'especial','plata','oro','platino']]
            }
      },

    },{
        timestamps:false
    });

    return RegistroSubasta;
  };