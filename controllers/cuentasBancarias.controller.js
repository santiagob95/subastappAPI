const db = require("../models/index");
const CuentasBancarias = db.cuentasBancarias;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// 1. Crea y guarda un CuentasBancarias
module.exports ={

  //API NN GET CuentasBancarias
  // 2. Toma todos los CuentasBancarias de la BD
  findAll (req, res) {
    const idCliente = req.query.idCliente;
    CuentasBancarias.findAll({ 
      where: {idCliente:idCliente}
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          msg:
            err.message || "Some error occurred while retrieving CuentasBancarias."
        });
      });
},

    create (req, res) {
        // Validate request
      if (!req.body.cbu) {
        res.status(400).send({
          msg: "Content can not be empty!"
            });
        return;
        }

        //Crear CuentasBancarias
      const cuentaBancaria = {
        cbu: req.body.cbu,
        tipo: req.body.tipo,
        cuil:req.body.cuil,
        alias:req.body.alias,
        estado:"en revision",
        //por quilombos de la relacion hay dos campos de id de usuario. No me preguntes porqué
        usuarioidCliente:req.body.usuario.idCliente,
        idCliente:req.body.usuario.idCliente
      };

        // Save CuentasBancarias in the database
        CuentasBancarias.create(cuentaBancaria)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            msg:
              err.message || "Some error occurred while creating the CuentasBancarias."
          });
        });

    },


    // Borra el CuentasBancarias segun un numero proporcionado
    delete(req, res) {
        const numero = req.params.numero;

        CuentasBancarias.destroy({
          where: { idCuentaBancaria: numero }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                msg: "Cuenta Bancaria was deleted successfully!"
              });
            } else {
              res.send({
                msg: `Cannot delete CuentasBancarias with NUMERO=${id}. Maybe CuentasBancarias was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              msg: "Could not delete CuentasBancarias with NUMERO= " + id
            });
          });
    },    
}

