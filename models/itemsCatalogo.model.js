module.exports = (sequelize, Sequelize) => {
    const ItemsCatalogo = sequelize.define("ItemsCatalogo", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // catalogoID: {
      //   type: Sequelize.STRING
      // },
      // productoID: {
      //   type: Sequelize.STRING
      // },
      precioBase: {
        type: Sequelize.FLOAT,
        validate:{
          min: 0.01
        }
      },
      comision: {
        type: Sequelize.FLOAT,
        validate:{
          min: 0.01
        }
      },
      subastado: {
        type: Sequelize.STRING,
        validate:{
            isIn: [['si', 'no']]
            }
      },
    },{
        timestamps:false
    });

    return ItemsCatalogo;
  };