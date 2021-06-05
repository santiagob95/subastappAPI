const db = require("../models/index");
const RegistrosSubasta = db.registrosSubasta;
const Op = db.Sequelize.Op;
//API 7 GET listado de los registro de subasta
// 2. Toma todos los registrosSubasta de UNA subasta de la BD
module.exports={
  findAll(req, res){
      const subastaID = req.query.subastaID;
      var condition = subastaID ? { subastaID: { [Op.like]: `%${subastaID}%` } } : null;
    
      RegistrosSubasta.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving registros Subasta."
          });
        });
      },

  // Encuentra un registro de subasta segun un numero proporcionado
  findOne (req, res) {
    const subastaID = req.params.subastaID;

    Paises.findByPk(subastaID)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving registro with NUMERO=" + subastaID
        });
      });
  }
}