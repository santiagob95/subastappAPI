module.exports = (sequelize, Sequelize) => {
    const Paises = sequelize.define("paises", {
      numero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombreCorto: {
        type: Sequelize.STRING
      },
      capital: {
        type: Sequelize.STRING
      },
      nacionalidad: {
        type: Sequelize.STRING
      },
      idiomas: {
        type: Sequelize.STRING
      },

    },{
        timestamps:false
    });

    return Paises;
  };