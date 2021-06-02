module.exports = app => {
    const productos = require("../controllers/productos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new productos
    router.post("/", productos.create);
  
    // Retrieve a single PAIS with numero
    router.get("/:numero", productos.findOne);
  
    // Delete a PAIS with numero
    router.delete("/:numero", productos.delete);

    app.use('/productos', router);
  };