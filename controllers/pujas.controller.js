const db = require("../models");
const Pujas = db.Pujas;
const Op = db.Sequelize.Op;

// 1. Crea y guarda una puja
exports.create = (req, res) => {
    // Validate request
  if (!req.body.numero) {
    res.status(400).send({
        message: "Content can not be empty!"
        });
    return;
    }

    //Crear Puja
  const puja = {
    asistente: req.body.asistente,
    item: req.body.nombreCorto,
    importe: req.body.capital
  };

    // Save Puja in the database
    Pujas.create(puja)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Puja."
      });
    });

};

// 2. Toma todos las Pujas de la BD
exports.findAll = (req, res) => {
    const numero = req.query.numero;
    var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;
  
    Pujas.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Puja."
        });
      });
};

// Encuentra un puja segun un numero proporcionado
exports.findOne = (req, res) => {
    const id = req.params.numero;

    Pujas.findByPk(numero)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Puja with NUMERO=" + id
        });
      });
};

// Actualiza un puja segun un numero proporcionado
exports.update = (req, res) => {
    const numero = req.params.numero;

    Pujas.update(req.body, {
      where: { numero: numero }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "puja was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update puja with NUMERO=${numero}. Maybe puja was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Puja with NUMERO=" + id
        });
      });
};




