const db = require("../models");
const Productos = db.productos;
const Op = db.Sequelize.Op;

module.exports ={
//API 4 GET items de un Catalogo
// Encuentra un producto segun un numero proporcionado
findOne (req, res) {
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
},

//API 8 POST productos
// 1. Crea y guarda un producto
create  (req, res) {
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

},
//API 9 GET productos de un cliente
findProdcutsFromCliente (req, res) {
  const idCliente = req.params.idCliente;

  Productos.findAll({
    where:{
      duenio:idCliente
    }
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving productos de idCliente:" + idCliente
      });
    });
},
    // API REST DE USO PARA PRUEBAS======================================================================
    

    // Borra el pais segun un numero proporcionado
    delete  (req, res){
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
    },
}


