module.exports = app => {
    const catalogos = require("../controllers/catalogos.controller.js");
  
    var router = require("express").Router();

    //API 1 GET Catalogos
    router.get("/", catalogos.findAll);
  
    app.use('/catalogo', router);
  };