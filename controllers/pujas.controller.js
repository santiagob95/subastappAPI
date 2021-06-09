const db = require("../models/index");
const Pujas = db.pujas;
const Asistentes = db.asistentes;
const RegistroSubasta = db.registroSubasta
const Op = db.Sequelize.Op;

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
    Asistentes.findOrCreate({ where:{
      cliente: cliente,
      subasta: subasta,},
      defaults:{
      numeroPostor: cliente}
    }).then((data) => {
      Pujas.create({
        asistente: data[0].dataValues.identificador,
        item: itemCatalogo,
        importe:importe
      })
      .then(puja => {
        res.send(puja);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Puja."
        });
      });
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Puja."
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
      data.foreach(
        element=>{
          
        }
      )
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Puja."
      });
    });
  }},


}