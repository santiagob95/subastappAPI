module.exports = app => {
    const catalogos = require("../controllers/catalogos.controller.js");
  
    var router = require("express").Router();

    //API 1 GET Catalogos
    router.get("/", catalogos.findAll);

    //API 4 GET items de un idCatalogo
    router.get("/id", catalogos.findProductosDeCatalogo);

    
    router.get("/catalogo",catalogos.findInfoDeCatalogo);
  
    app.use('/api/catalogo', router);
  };