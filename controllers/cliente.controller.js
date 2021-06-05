const { usuarios } = require("../models/index");
const db = require("../models/index");
const Clientes = db.cliente;
const Op = db.Sequelize.Op;


module.exports ={

    //API 3 Post Cliente
    // 1. Crea y guarda un cliente
    create(req, res)  {
        // Validate request
      if (!req.body.numero) {
        res.status(400).send({
            message: "Content can not be empty!"
            });
        return;
        }

        //Crear cliente
      const cliente = {
        nombre: req.body.nombre,
        documento:req.body.documento,
        direccion: req.body.direccion,
        numeroPais: req.body.numeroPais,
        foto: req.body.foto
      };

        // Save cliente in the database
        Clientes.create(cliente)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the client."
          });
        });

    },

    //API 6 PUT CLIENTE con id, actualiza datos de un cliente
    actualizarCliente(req,res){
      let idCliente = req.body.idCliente;
      
      usuarios.update({

      },
      {
        returning:true, 
        plain:true,
        where:{
            idCliente:idCliente
        }
    }).then(result=>{
      res.status(404).json({msg:"Se actualizaron los datos correctamente.",result:result[1]})
    }).catch(err =>{
      res.status(500).json({msg:"No se pudieron actualizar los datos."})
    })

    },

    // Encuentra un cliente segun un numero proporcionado
    findOne  (req, res) {
        const id = req.params.numero;

        Clientes.findByPk(numero)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving client with NUMERO=" + id
            });
          });
    },

    // Actualiza un cliente segun un numero proporcionado
    update  (req, res){
        const identificador = req.params.identificador;

        Clientes.update(req.body, {
          where: { identificador: identificador }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Cliente was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update client with identificador=${identificador}. Maybe client was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating client with identificador=" + identificador
            });
          });
    }
}


