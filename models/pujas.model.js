module.exports = (sequelize, Sequelize) => {
    const Pujas = sequelize.define("puja", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      asistente: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      importe: {
        type: Sequelize.FLOAT
      },
      ganador: {
        type: Sequelize.STRING
      }

    },{
        timestamps:false
    });
    // Pujas.belongsTo(Asistentes,{foreignKey: 'fk_pujos_asistentes', targetKey: 'asistente'})
    // Pujas.belongsTo(ItemsCatalogo,{foreignKey: 'fk_pujos_itemsCatalogo', targetKey: 'item'})
    return Pujas;
  };