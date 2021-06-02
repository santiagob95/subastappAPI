const db = require("../models");
const Catalogos = db.catalogos;
const Op = db.Sequelize.Op;

// 2. Toma todos los catalogos de la BD
exports.findAll = (req, res) => {
    const identificador = req.query.identificador;
    var condition = identificador ? { identificador: { [Op.like]: `%${identificador}%` } } : null;
  
    Catalogos.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving CATALOGOS."
        });
      });
    };