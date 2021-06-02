module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
      idCliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuario: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      verificador: {
        type: Sequelize.INTEGER
      },
      documento: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.INTEGER
      },
      direccion: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.INTEGER
      },
    },{
        timestamps:false
    });

    return Usuarios;
  };