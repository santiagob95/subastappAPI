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
const { subastas } = require("./models/index");
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

app.post("/activarSubasta",(req, res)=>{
  const sub = req.query.subasta
  db.subastas.findOne({where:{identificador:sub}
  }).then(subasta=>{
    if(subasta){
      subasta.update({
        estado:"abierta"
      }).then(s=>{
        res.send("se activo la subasta")
      })
    }
  })
  db.subastas.update({
    where:{
      identificador:sub
    }
  }).then(subasta=>{
    if(subasta!=null){
    

    }
  })

})

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

const Op = db.Sequelize.Op;

io.on("connection", (socket1,socket2) => {
  console.log("Usuario Conectado")

  socket1.on("ultimaPuja",(itemCatalogo,callback)=>{
    console.log("id producto: "+itemCatalogo);

    db.pujas.findAll({ where:{
      item: itemCatalogo,
   },order:[['identificador', 'DESC']],
  })
    .then(data => {
      console.log("encontre: "+ data)
      callback({
        estado:data[0] ? 'ok': 'not found',
        lastPuja:data[0]
      })
    })  
  })


  socket1.on("findLatestPujaSubasta",(subasta,callback)=>{
    db.catalogos.findAll({
      include: {
        model:db.subastas,
        as:"subasta",
        attributes:['fecha','hora',"identificador"]
      },
      where:{
        subastaID: subasta,
      }
    }).then(cata => {
      console.log("\n\n\n=== cata ===",cata);
      let horarioSubasta= cata[0].dataValues.subasta.hora;
      const catalog=[]
      cata.forEach(id=>catalog.push(id.dataValues.identificador))
      console.log("\n\n\n=== catalog ===",catalog);
      db.itemsCatalogo.findAll({ where:{
        catalogo: { [Op.in]:catalog }
        }
      }).then(items => {
        console.log("\n\n\n=== items ===",items);
        const values=[]
        const itemsPendientes=[]
        items.forEach(id=>values.push(id.dataValues.identificador))
        
        items.forEach(id=>{
          if (id.dataValues.subastado=='no'){
            itemsPendientes.push(id.dataValues.identificador)
          }
        })
        console.log("\n\n\n=== values ===",values);
        db.pujas.findAll({ 
          where:{
            item: { [Op.in]:values }
          },
          limit: 1 ,
          order:[['identificador', 'DESC']]
        })
        .then(data => {
          callback({
            estado:'ok',
            horarioSubasta:horarioSubasta,
            lastPuja:data[0].dataValues,
            items:itemsPendientes
          });
        })
        .catch(err => {
          callback({
            estado: "Pujas for client cannot be retrieved"
          });
        });
      }).catch(err => {
        callback({
          estado:
            err.message || "Pujas for subasta cannot be retrieved"
        });
      });
    })
    .catch(err => {
      callback({
        estado:
          err.message || "Catalogo for subasta cannot be retrieved"
      });
    });

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