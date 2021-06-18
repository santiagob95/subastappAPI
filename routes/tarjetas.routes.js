module.exports = app => {
    const tarjetas = require("../controllers/tarjetas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new TARJETA
    router.post("/", tarjetas.create);
  
    // Retrieve all tarjetas
    router.get("/", tarjetas.findAll);
  
    // Update a TARJETA with numero
    router.post("/:numero", tarjetas.update);
  
    // Delete a TARJETA with numero
    router.delete("/:numero", tarjetas.delete);
    
    app.use('/api/tarjetas', router);
  };