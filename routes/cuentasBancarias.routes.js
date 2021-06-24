module.exports = app => {
    const cuentasBancarias = require("../controllers/cuentasBancarias.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cuentasBancarias
    router.post("/", cuentasBancarias.create);
  
    // Retrieve all cuentasBancarias
    router.get("/", cuentasBancarias.findAll);
    
    // Delete a cuentasBancarias with numero
    router.delete("/:numero", cuentasBancarias.delete);
    
    app.use('/api/cuentasBancarias', router);
  };