const { catalogos } = require("../models/index");
const db = require("../models/index");
const Catalogos = db.catalogos;
const Op = db.Sequelize.Op;

//API 1 GET CATALOGOS
// 2. Toma todos los catalogos de la BD
module.exports ={
  findAll (req, res){
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
      },

      //API 4 GET items de un Catalogo
      // Encuentra los productos de un catalogo brindado
      findProductosDeCatalogo(req, res) {
        const catalogoID = req.body.identificador;
        Catalogos.findByPk(catalogoID).then(catalogo => {
          catalogo.getProductos().then(productos=>{
            res.json(productos)
          })
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving CATALOGOS."
          });
        });


        // ItemsCatalogo.findAll({
        //   where:{
        //     catalogoID:catalogoID
        //   }
        // })
        //   .then(itemsCat => {
        //     let listadoProductos =Array;
        //     itemsCat.forEach(item => {
        //       Producto.findByPk(item.productoID)
        //       .then(prod => {
        //         listadoProductos.push(prod)
        //       }).catch(err=>{
        //         res.status(500).send({msg})
        //       })
        //     })
        //     res.send(listadoProductos);
        //   })
        //   .catch(err => {
        //     res.status(500).send({
        //       msg: "Error retrieving productos with idCatalogo=" + id
        //     });
        //   });
      },
}