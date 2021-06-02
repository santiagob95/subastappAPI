module.exports = app => {
    const catalogos = require("../controllers/catalogos.controller.js");
  
    var router = require("express").Router();

    // Retrieve all Catalogos
    router.get("/", catalogos.findAll);
  
    app.use('/catalogo', router);
  };