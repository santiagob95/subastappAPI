module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
      idCliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
      },
      idUsuario: {
        type: Sequelize.STRING,
        unique:true,
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        validate:{
          isEmail:{
            msg:"El email tiene que ser valido"
          }
        }
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
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.STRING
      },
    },{
        timestamps:false
    });

    return Usuarios;
  };