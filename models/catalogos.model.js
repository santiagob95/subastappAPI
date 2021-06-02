module.exports = (sequelize, Sequelize) => {
    const Catalogos = sequelize.define("catalogos", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING
      },
      subasta: {
        type: Sequelize.INTEGER
      },
      responsable: {
        type: Sequelize.INTEGER
      },
      imagenes :{
        type: Sequelize.ARRAY(Sequelize.TEXT) 
      }
    },{
        timestamps:false
    });

    return Catalogos;
  };