const db = require("./index");
const Producto = db.productos
const Catalogo = db.catalogos
const Subasta = db.subastas
const Usuario = db.usuarios
const Tarjeta = db.tarjetas

//Item catalogo tiene un producto y un catalogo en el que esta
// ItemsCatalogo.belongsTo(Producto);
// ItemsCatalogo.belongsTo(Catalogo);


//N a N 
Producto.belongsToMany(Catalogo,{through:"ItemsCatalogo"})
Catalogo.belongsToMany(Producto,{through:"ItemsCatalogo"})

//1 a N
Usuario.hasMany(Tarjeta, {as:"tarjetas"})
Tarjeta.belongsTo(Usuario,{as:"test",foreignKey:"idCliente"})

//1 a N
Subasta.hasMany(Catalogo, {as:"catalogos"})
Catalogo.belongsTo(Subasta,{as:"subasta",foreignKey:"subastaID"})

