module.exports = app => {
    const paises = require("../controllers/paises.controller.js");
  
    var router = require("express").Router();
  
    // Create a new PAIS
    router.post("/", paises.create);
  
    // Retrieve all PAISES
    router.get("/", paises.findAll);
  
    // Retrieve a single PAIS with numero
    router.get("/:numero", paises.findOne);
  
    // Update a PAIS with numero
    router.put("/:numero", paises.update);
  
    // Delete a PAIS with numero
    router.delete("/:numero", paises.delete);
  
    // Delete all PAISES
    router.delete("/", paises.deleteAll);
  
    app.use('/api/paises', router);
  };