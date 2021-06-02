const db = require("../models");
const Usuarios = db.usuarios;
const Op = db.Sequelize.Op;
/*
// 1. Crea y guarda un usuario
exports.create = (req, res) => {
    // Validate request
  if (!req.body.idUsuario) {
    res.status(400).send({
        message: "Content can not be empty!"
        });
    return;
    }

    //Crear usuario
  const usuario = {
    idUsuario: req.body.idUsuario,
    idCliente: req.body.idCliente,
    contraseña: req.body.contraseña,
    categoria: req.body.categoria,
    verificador: req.body.verificador,
    documento: req.body.documento,
    estado: req.body.estado,
    imagen:req.body.imagen
  };

    // Save usuario in the database
  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the usuario."
      });
    });

};
*/


// Encuentra un usuario segun un numero proporcionado
exports.chkLoginCred = (req, res) => {
    const idUsuario = req.params.idUsuario;
    const password = req.params.password;

    Usuarios.findByPk(idUsuario)
      .then(data => {
        if( data.password == password)
          res.send(data);
        else{
          res.status(404).send({
            message: "Usuario o password incorrecta" 
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving usuario"
        });
      });
};


exports.create = (req, res) => {
  // Validate request
if (!req.body.usuario) {
  res.status(400).send({
      message: "Content can not be empty!"
      });
  return;
  }

  //Crear Usuarios
const credenciales = {
  idUsuario: req.body.idUsuario,
  password: req.body.password,
  idCliente:req.body.idCliente,
  idUsuario:req.body.idUsuario,
  categoria: req.body.categoria,
  verificador:req.body.verificador,
  documento:req.body.documento,
  nombre:req.body.nombre,
  direccion:req.body.direccion,
  estado:"pendiente de confirmacion",
  imagen:"foto.jpg"
};

  // Save Usuarios in the database
  Usuarios.create(credenciales)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the USUARIO."
    });
  });

};