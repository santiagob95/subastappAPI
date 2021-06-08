module.exports = (sequelize, Sequelize) => {
    const Asistentes = sequelize.define("asistentes", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroPostor: {
        type: Sequelize.INTEGER,
      },
      cliente: {
        type: Sequelize.INTEGER,
      },
      subasta: {
        type: Sequelize.INTEGER
      },

    },{
        timestamps:false
    });
    // Asistentes.belongsTo(Clientes,{foreignKey: 'fk_asistentes_clientes', targetKey: 'cliente'})
    // Asistentes.belongsTo(Subastas,{foreignKey: 'fk_asistentes_subasta', targetKey: 'subasta'})
    return Asistentes;
  };