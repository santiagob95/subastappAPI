const db = require("../models");
const Tarjetas = db.tarjetas;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// 1. Crea y guarda un Tarjetas
module.exports ={

  //API NN GET Tarjetas
  // 2. Toma todos los Tarjetas de la BD
  findAll (req, res) {
    const idCliente = req.query.idCliente;
    Tarjetas.findAll({ 
      where: {idCliente:idCliente}
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          msg:
            err.message || "Some error occurred while retrieving Tarjetas."
        });
      });
},

    create (req, res) {
        // Validate request
      if (!req.body.numero) {
        res.status(400).send({
          msg: "Content can not be empty!"
            });
        return;
        }

        //Crear Tarjetas
      const tarjeta = {
        numero: req.body.numero,
        nombre: req.body.nombre,
        tipo:req.body.tipo,
        vencimiento:req.body.vencimiento,
        cvv:req.body.cvv,
        estado:"en revision",
        //por quilombos de la relacion hay dos campos de id de usuario. No me preguntes porqué
        usuarioidCliente:req.body.usuario.idCliente,
        idCliente:req.body.usuario.idCliente
      };

        // Save Tarjetas in the database
      Tarjetas.create(tarjeta)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            msg:
              err.message || "Some error occurred while creating the tarjeta."
          });
        });

    },


    // Borra el Tarjetas segun un numero proporcionado
    delete(req, res) {
        const numero = req.params.numero;

        Tarjetas.destroy({
          where: { numero: numero }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                msg: "Tarjetas was deleted successfully!"
              });
            } else {
              res.send({
                msg: `Cannot delete Tarjetas with NUMERO=${id}. Maybe Tarjetas was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              msg: "Could not delete Tarjetas with NUMERO= " + id
            });
          });
    },    
}

