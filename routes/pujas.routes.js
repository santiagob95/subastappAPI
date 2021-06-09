module.exports = app => {
    const pujas = require("../controllers/pujas.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pujas
    router.post("/", pujas.create);
  
    // Retrieve a single pujas with numero
    router.get("/all", pujas.findAll);

    // Retrieve a single pujas with numero
    router.get("/latest", pujas.findLatest);
  
    app.use('/api/pujas', router);
  };