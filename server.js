const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./models/associations');
require('dotenv').config()
require('./timer')



const app = express();

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
require("./routes/cliente.routes")(app);
require("./routes/tarjetas.routes")(app);
require("./routes/cuentasBancarias.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


/*
async const pais =  db.paises.create({
  nombre:"Peru",
  nombreCorto:"PE",
  capital:"Lima",
  nacionalidad:"Peruano/a",
  idiomas:"ESP"

});
*/
