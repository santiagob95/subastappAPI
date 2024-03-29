module.exports = app => {
    const productos = require("../controllers/productos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new productos
    router.post("/", productos.create);

    //Busca los productos publicados por un cliente
    router.get("/cliente",productos.findProdcutsFromCliente)

    router.get("/producto",productos.findProdcuto)

    router.get("/item",productos.findItem)
  
  
    // Delete a Producto with numero
    router.delete("/:identificador", productos.delete);

    app.use('/api/productos', router);
  };