const db = require("../models");
const Paises = db.paises;
const Op = db.Sequelize.Op;

// 1. Crea y guarda un pais
exports.create = (req, res) => {
    // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
        message: "Content can not be empty!"
        });
    return;
    }

    //Crear Pais
  const pais = {
    numero: req.body.numero,
    nombre: req.body.nombre,
    nombreCorto: req.body.nombreCorto,
    capital: req.body.capital,
    nacionalidad: req.body.nacionalidad,
    idiomas: req.body.idiomas
  };

    // Save Pais in the database
  Paises.create(pais)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PAIS."
      });
    });

};

// 2. Toma todos los paises de la BD
exports.findAll = (req, res) => {
    const numero = req.query.numero;
    var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;
  
    Paises.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PAISES."
        });
      });
};

// Encuentra un pais segun un numero proporcionado
exports.findOne = (req, res) => {
    const id = req.params.numero;

    Paises.findByPk(numero)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PAIS with NUMERO=" + id
        });
      });
};

// Actualiza un pais segun un numero proporcionado
exports.update = (req, res) => {
    const numero = req.params.numero;

    Paises.update(req.body, {
      where: { numero: numero }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PAIS was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update PAIS with NUMERO=${numero}. Maybe PAIS was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PAIS with NUMERO=" + id
        });
      });
};

// Borra el pais segun un numero proporcionado
exports.delete = (req, res) => {
    const numero = req.params.numero;

    Paises.destroy({
      where: { numero: numero }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PAIS was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete PAIS with NUMERO=${id}. Maybe PAIS was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PAIS with NUMERO= " + id
        });
      });
};

// Borra TODOS los paises de la BD
exports.deleteAll = (req, res) => {
    Paises.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} PAISES were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all PAISES."
          });
        });
};

