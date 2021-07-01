const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./models/associations');
require('dotenv').config()
require('./socketImplementation')
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//sync sequelize
const db = require("./models/index");
require('./models/associations');

//borra la BD y la reinicia, hay que sacar todo lo que este en sync(...) para que no borre!
db.sequelize.sync({ force: false }).then(() => {

  console.log("Drop and re-sync db.");

}).then(()=>{
  console.log("\n\n\n=== BD lista para su uso ===");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SubastApp." });
});

require("./routes/paises.routes")(app);
require("./routes/catalogos.routes")(app);
require("./routes/productos.routes")(app);
require("./routes/registroSubasta.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/pujas.routes")(app);
require("./routes/socketPujas.routes.js")(app);
require("./routes/cliente.routes")(app);
require("./routes/tarjetas.routes")(app);
require("./routes/cuentasBancarias.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
httpServer.listen(8080);



io.on("connection", socket => {
  console.log("Usuario Conectado")

  socket.on("ultimaPuja",(itemCatalogo,callback)=>{
    console.log("id producto: "+itemCatalogo);

    db.pujas.findAll({ where:{
      item: itemCatalogo,
   },order:[['identificador', 'DESC']],
  })
    .then(data => {
      console.log("encontre: "+ data)
      callback({
        status:data[0] ? 'ok': 'not found',
        lastPuja:data[0]
      })
    })  
  })
  socket.on("findLatestPujaSubasta",(itemCatalogo,callback)=>{

  })
  // socket.broadcast.emit('findLatestPujaSubasta',(msg)=>{
  //   console.log(msg);
  //   //io.emit('msg')
  // })
  
  // socket.broadcast.emit('findLatest',(msg)=>{
  //   console.log(msg);
  //   //io.emit('msg')
  // })
})
io.on("hello",(args)=>{
  console.log(args)
})