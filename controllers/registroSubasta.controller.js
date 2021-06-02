const db = require("../models");
const RegistrosSubasta = db.registrosSubasta;
const Op = db.Sequelize.Op;

// 2. Toma todos los registrosSubasta de UNA subasta de la BD
exports.findAll = (req, res) => {
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
    };