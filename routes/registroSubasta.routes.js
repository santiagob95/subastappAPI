module.exports = app => {
    const registrosSubasta = require("../controllers/registroSubasta.controller.js");
  
    var router = require("express").Router();

    // Obtener todos los registros de una subasta

    router.get("/:subasta", registrosSubasta.findOne);
    router.get("/", registrosSubasta.findAll);
  
    app.use('/api/RegSub', router);
  };