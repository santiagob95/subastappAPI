module.exports = app => {
    const pujas = require("../controllers/pujas.controller.js");
  
    var router = require("express").Router();
    
    /*router.get("/*",(req, res)=>{
      res.json({ message: "Welcome to SubastApp." });
    });*/
    // Retrieve a single pujas with numero
    router.get("/latest", pujas.findLatest);
   
    
    router.get("/latestSubasta", pujas.findLatestPujaSubasta);
    
    
    app.use('/socket/pujas', router);
  };