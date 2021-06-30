const { productos,subastas } = require("../models/index");
const db = require("../models/index");
const Pujas = db.pujas;
const Asistentes = db.asistentes;
const RegistroSubasta = db.registroSubasta
const Op = db.Sequelize.Op;
const Producto = db.productos
const itemsCatalogo = db.itemsCatalogo
//API 5 GET pujos de un identificador
// Encuentra un puja segun un numero proporcionado
module.exports ={
  findOne(req, res){
    const id = req.params.numero;

    Pujas.findByPk(numero)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Puja with NUMERO=" + id
        });
      });
  },
    
  findLatest  (req, res){
    let itemCatalogo = req.query.itemCatalogo;
    if(!itemCatalogo){
      res.status(404).json({msg:"Valor de item incompleto"})
    } else {
    Pujas.findAll({ where:{
        item: itemCatalogo,
     },order:[['identificador', 'DESC']],
    })
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Puja."
        });
      });
  }},
  //API 10 POST PUJA
  // 1. Crea y guarda una puja
  create (req, res) {
      // Validate request
    let subasta = req.body.subasta;
    let cliente = req.body.cliente;
    let itemCatalogo = req.body.itemCatalogo;
    let importe = req.body.importe;
    let categoria = req.body.categoria;
    Asistentes.findAll({ where:{
      cliente: cliente,
      },
    }).then((asistente)=>{
      console.log("\n\n\n=== asistente ===",asistente);
      const values=[]
      asistente.forEach(id=>values.push(id.dataValues.subasta))
      console.log("\n\n\n=== values ===",values);
      subastas.findAll({
        where:{identificador: { [Op.in]:values },
        estado:"abierta"
      }
      }).then((subastas)=>{
        console.log("\n\n\n=== asistente ===",subastas);
        if ((subastas.length==0) || ((subastas.length==1) && (subastas[0].dataValues.identificador==subasta))){
          Asistentes.findOrCreate({ where:{
            cliente: cliente,
            subasta: subasta,},
            defaults:{
            numeroPostor: cliente}
          }).then((data) => {
            let asistente = data[0].dataValues.identificador;
            Pujas.findAll({ where:{
                item: itemCatalogo,
            },order:[['identificador', 'DESC']],
            }).then(lastPuja => {
              if (lastPuja.length==0){ var importeLastPuja=0} else{ var importeLastPuja=lastPuja[0].dataValues.importe} 
              if ( ((categoria in ["oro","platino"]) || (importe < (importeLastPuja)*1.20)) && !(importe==importeLastPuja) || (importeLastPuja==0) ){
                  Pujas.create({ 
                    asistente: asistente,
                    item: itemCatalogo,
                    importe:importe
                  })
                  .then(puja => {
                    res.send(puja);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Error occurred while creating the Puja."
                    });
                  });
              }else {
                  res.status(500).send({
                    message:
                      "Importe supera el 20% de la puja previa o es igual a la ultima puja"
                  });
                }
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Could not find puja previa"
              });
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Asistente."
            });
          });
        }
        else
        {
          res.status(500).send({
          message:
            "Ya esta participando de una subasta activa"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Could not find puja previa"
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving All Asistente."
      });
    });
  },

  //APIS DE PRUEBAS======================================================================
  

  // 2. Toma todos las Pujas de la BD
  findAll (req, res){
    let itemCatalogo = req.query.itemCatalogo;
    if(!itemCatalogo){
      res.status(404).json({msg:"Valor de item incompleto"})
  } else {
    Pujas.findAll({ where:{
      item: itemCatalogo,
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Puja."
      });
    });
  }},

  findAllForOnePerson (req, res){
    let cliente = req.query.cliente;
    if(!cliente){
      res.status(404).json({msg:"Valor de cliente incompleto"})
  } else {
    Asistentes.findAll({ where:{
      cliente: cliente,
    }
  })
    .then(data => {
      console.log("\n\n\n=== data ===",data);
      const values=[]
      data.forEach(id=>values.push(id.dataValues.identificador))
      console.log("\n\n\n=== values ===",values);
      Pujas.findAll({ where:{
        asistente: { [Op.in]:values }
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Pujas for client cannot be retrieved"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Assistent for client cannot be retrieved"
      });
    });
  }},


}