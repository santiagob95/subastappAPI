const db = require("../models");
const Tarjetas = db.tarjetas;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// 1. Crea y guarda un Tarjetas
module.exports ={

  //API NN GET Tarjetas
  // 2. Toma todos los Tarjetas de la BD
  findAll (req, res) {
    const numero = req.query.numero;
    var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;
  
    Tarjetas.findAll({ where: condition })
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
        estado:"en revision"
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


    // Actualiza un Tarjetas segun un numero proporcionado
    update (req, res) {
        const numero = req.params.numero;

        Tarjetas.update(req.body, {
          where: { numero: numero }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tarjetas was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Tarjetas with NUMERO=${numero}. Maybe Tarjetas was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              msg: "Error updating Tarjetas with NUMERO=" + id
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

