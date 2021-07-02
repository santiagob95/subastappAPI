const { productos, catalogos } = require("../models/index");
const db = require("../models/index");
const Pujas = db.pujas;
const Asistentes = db.asistentes;
const RegistroSubasta = db.registroSubasta
const Op = db.Sequelize.Op;
const Producto = db.productos
const itemCatalogo = db.itemsCatalogo
const Subasta = db.subastas

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
      const asistentes=[]
      data.forEach(id=>asistentes.push(id.dataValues.identificador))
      const subastasId=[]
      data.forEach(id=>subastasId.push(id.dataValues.subasta))
      catalogos.findAll({
        include: {
          model:Subasta,
        as:"subasta",
        attributes:['fecha','hora','estado','ubicacion','categoria',"identificador"]
      },
        where:{
          subastaID: { [Op.in]:subastasId }
        }
      }).then(data =>{
        
      console.log("\n\n\n=== data ===",data);
      const subastasInfo=[]
      data.forEach(id=>subastasInfo.push(id.dataValues.subasta))
        Pujas.findAll({ 
          where:{
            asistente: { [Op.in]:asistentes }
          }
        })
        .then(data => {
          res.send({data:data,subastas:subastasInfo});
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
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Assistent for client cannot be retrieved"
      });
    });
  }},

  findLatestPujaSubasta (req, res){
    let subasta = req.query.subasta;
    if(!subasta)
    {
      res.status(404).json({msg:"Valor de subasta incompleto"})
    } 
    else
    {
      catalogos.findAll({
        include: {
          model:Subasta,
          as:"subasta",
          attributes:['fecha','hora',"identificador"]
        },
        where:{
          subastaID: subasta,
        }
      }).then(cata => {
        console.log("\n\n\n=== cata ===",cata);
        let horarioSubasta= cata[0].dataValues.subasta.hora;
        const catalog=[]
        cata.forEach(id=>catalog.push(id.dataValues.identificador))
        console.log("\n\n\n=== catalog ===",catalog);
        itemCatalogo.findAll({ where:{
          catalogo: { [Op.in]:catalog }
          }
        }).then(items => {
          console.log("\n\n\n=== items ===",items);
          const values=[]
          const itemsPendientes=[]
          items.forEach(id=>values.push(id.dataValues.identificador))
          
          items.forEach(id=>{
            if (id.dataValues.subastado=='no'){
              itemsPendientes.push(id.dataValues.identificador)
            }
          })
          console.log("\n\n\n=== values ===",values);
          Pujas.findAll({ 
            where:{
              item: { [Op.in]:values }
            },
            limit: 1 ,
            order:[['identificador', 'DESC']]
          })
          .then(data => {
            res.send({
              horarioSubasta:horarioSubasta,
              createdAt: data[0].dataValues.createdAt,
              lastItem:data[0].dataValues.item,
              items:itemsPendientes
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Pujas for client cannot be retrieved"
            });
          });
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Pujas for subasta cannot be retrieved"
          });
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Catalogo for subasta cannot be retrieved"
        });
      });
    }
  },
}