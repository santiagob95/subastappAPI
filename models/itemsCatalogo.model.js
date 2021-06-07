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
        type: Sequelize.FLOAT
      },
      comision: {
        type: Sequelize.FLOAT
      },
      subastado: {
        type: Sequelize.BOOLEAN
      },
    },{
        timestamps:false
    });

    return ItemsCatalogo;
  };