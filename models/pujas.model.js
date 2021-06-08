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
        type: Sequelize.FLOAT,
        validate:{
          min: 0.01
        }
      },
      ganador: {
        type: Sequelize.STRING,
        defaultValue: "no",
        validate:{
            isIn: [['si', 'no']]
            }
      }

    },{
        timestamps:false
    });
    // Pujas.belongsTo(Asistentes,{foreignKey: 'fk_pujos_asistentes', targetKey: 'asistente'})
    // Pujas.belongsTo(ItemsCatalogo,{foreignKey: 'fk_pujos_itemsCatalogo', targetKey: 'item'})
    return Pujas;
  };