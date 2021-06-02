module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js");
  
    var router = require("express").Router();

    // Verificar credenciales ingresadas
    router.get("/", usuarios.chkLoginCred);
    
    router.post("/",usuarios.create);
  
  
    app.use('/login', router);
  };