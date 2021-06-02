module.exports = app => {
    const pujas = require("../controllers/pujas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pujas
    router.post("/", pujas.create);
  
    // Retrieve a single pujas with numero
    router.get("/:numero", pujas.findOne);
  
    app.use('/api/pujas', router);
  };