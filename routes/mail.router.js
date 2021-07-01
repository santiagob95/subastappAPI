module.exports = app => {
    const mail = require("../controllers/pujas.controller.js");
  
    var router = require("express").Router();
  
    //sendEmail
    router.post("/api/sendEmail", mailController.sendEmail);
  
  };