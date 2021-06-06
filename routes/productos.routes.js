module.exports = app => {
    const productos = require("../controllers/productos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new productos
    router.post("/", productos.create);
  
    //API 4 GET items de un idCatalogo
    router.get("/:identificador", productos.findProductosDeCatalogo);

    //Busca los productos publicados por un cliente
    router.get("/cliente",productos.findProdcutsFromCliente)
  
    // Delete a Producto with numero
    router.delete("/:identificador", productos.delete);

    app.use('/api/productos', router);
  };