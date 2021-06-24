module.exports = app => {
    const tarjetas = require("../controllers/tarjetas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new TARJETA
    router.post("/", tarjetas.create);
  
    // Retrieve all tarjetas
    router.get("/", tarjetas.findAll);
  
    // Delete a TARJETA with numero
    router.delete("/:numero", tarjetas.delete);
    
    app.use('/api/tarjetas', router);
  };