module.exports = (sequelize, Sequelize) => {
    const Personas = sequelize.define("persona", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      documento: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },

    },{
        timestamps:false
    });
    return Personas;
  };