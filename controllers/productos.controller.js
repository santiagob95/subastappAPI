const db = require("../models");
const Productos = db.productos;
const Op = db.Sequelize.Op;

// 1. Crea y guarda un producto
exports.create = (req, res) => {
    // Validate request
  if (!req.body.fecha) {
    res.status(400).send({
        message: "Content can not be empty!"
        });
    return;
    }

    //Crear productos
  const producto = {
    fecha: req.body.fecha,
    disponible: req.body.disponible,
    descripcionCatalogo: req.body.descripcionCatalogo,
    descripcionCompleta: req.body.descripcionCompleta,
    revisor: req.body.revisor,
    duenio: req.body.duenio,
    productoID: req.body.productoID,
    foto: req.body.foto,
  };

    // Save Pais in the database
    Productos.create(producto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the productos."
      });
    });

};

// Encuentra un pais segun un numero proporcionado
exports.findOne = (req, res) => {
    const id = req.params.identificador;

    Productos.findByPk(identificador)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving productos with NUMERO=" + id
        });
      });
};

// Borra el pais segun un numero proporcionado
exports.delete = (req, res) => {
    const identificador = req.params.identificador;

    Productos.destroy({
      where: { identificador: identificador }
    })
      .then(id => {
        if (id == 1) {
          res.send({
            message: "productos was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete productos with NUMERO=${id}. Maybe productos was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete productos with NUMERO= " + id
        });
      });
};


