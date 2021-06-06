const auth = require("../controllers/auth.controller.js");

module.exports = app => {
    const usuarios = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();

    // Verificar credenciales ingresadas
    router.post("/mail", auth.checkMail);
    
    router.post("/pass",auth.checkPass);
    
    router.put("/pass",auth.generatePass);

    router.post("/signUp", auth.signUp);
  
    app.use('/api/auth', router);
  };