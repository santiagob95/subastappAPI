module.exports = (sequelize, Sequelize) => {
    const Duenios = sequelize.define("duenios", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      numeroPais: {
        type: Sequelize.INTEGER,
      },
      verificacionFinanciera: {
        type: Sequelize.STRING,
        validate:{
            isIn: [['si', 'no']]
            }
      },
      verificacionJudicial: {
        type: Sequelize.STRING,        
        validate:{
            isIn: [['si', 'no']]
            }
          },
      calificacionRiesgo: {
        type: Sequelize.INTEGER,
        validate:{
            isIn: [[1,2,3,4,5,6]]
            }
      },
      verificador: {
        type: Sequelize.INTEGER
      },

    },{
        timestamps:false
    });
    // Asistentes.belongsTo(Clientes,{foreignKey: 'fk_asistentes_clientes', targetKey: 'cliente'})
    // Asistentes.belongsTo(Subastas,{foreignKey: 'fk_asistentes_subasta', targetKey: 'subasta'})
    return Duenios;
  };