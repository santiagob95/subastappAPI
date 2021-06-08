const db = require("../models/index");
const Productos = db.productos;
const Duenio = db.duenios;
const ItemsCatalogo = db.itemsCatalogo
const Catalogos = db.catalogos
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const { catalogos } = require("../models/index");

module.exports ={

//API 8 POST productos
// 1. Crea y guarda un producto
create (req, res) {
  if (!req.body.fecha) {
    res.status(400).send({
        message: "Content can not be empty!"
        });
    return;
    }
      // Validate requestconst
  let fecha=req.body.fecha;
  let descripcionCatalogo=req.body.descripcionCatalogo;
  let descripcionCompleta= req.body.descripcionCompleta;
  let duenio=req.body.duenio;
  let foto=req.body.foto;
  Duenio.findOrCreate({ 
    where:{
      identificador: duenio,
    },
    defaults:{
      verificacionFinanciera:"no",
      verificacionJudicial:"no",
      calificacionRiesgo:1
    }
  })
  .then((data) => {
      console.log("\n=== Duenio ===",data); 
      producto = {
          fecha: fecha,
          disponible: "si",
          descripcionCatalogo: descripcionCatalogo,
          descripcionCompleta: descripcionCompleta,
          duenio: duenio,
          foto: foto,
          };
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
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the Puja."
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


