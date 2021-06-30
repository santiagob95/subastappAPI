const db = require("./index");
const Producto = db.productos
const Catalogo = db.catalogos
const Subasta = db.subastas
const Usuario = db.usuarios
const Tarjeta = db.tarjetas
const CuentasBancarias = db.cuentasBancarias
const Pujas = db.pujas;
const Asistentes = db.asistentes;
const Cliente = db.cliente;
const itemsCatalogo = db.itemsCatalogo;
const registroSubasta = db.registroSubasta;
const Duenio = db.duenios
const Persona = db.personas

//Item catalogo tiene un producto y un catalogo en el que esta
// ItemsCatalogo.belongsTo(Producto);
// ItemsCatalogo.belongsTo(Catalogo);


//N a N 
Producto.belongsToMany(Catalogo,{through:"ItemsCatalogo",foreignKey:"producto"})
Catalogo.belongsToMany(Producto,{through:"ItemsCatalogo",foreignKey:"catalogo"})

//1 a N
//Usuario.hasMany(Tarjeta, {as:"tarjetas"})
Tarjeta.belongsTo(Usuario,{as:"test",foreignKey:"idCliente"})
//1 a N
//Usuario.hasMany(CuentasBancarias, {as:"CuentaBancaria"})
CuentasBancarias.belongsTo(Usuario,{as:"test",foreignKey:"idCliente"})
//1 a N
//Subasta.hasMany(Catalogo, {as:"catalogos",foreignKey:"Yesto"})
Catalogo.belongsTo(Subasta,{as:"subasta",foreignKey:"subastaID"})

//New
//1 a N
Asistentes.hasOne(Pujas, {foreignKey: 'asistente'})
itemsCatalogo.hasOne(Pujas, {foreignKey: 'item'})

//1 a 1
Cliente.hasOne(Asistentes,{foreignKey: 'cliente'})
Subasta.hasOne(Asistentes,{foreignKey: 'subasta'})

Duenio.hasMany(Producto, {as:"producto",foreignKey:"duenio"})
//Producto.belongsTo(Duenio,{as:"duenio",foreignKey:"duenio"})

Cliente.hasOne(registroSubasta,{foreignKey: 'clienteID'})
Subasta.hasOne(registroSubasta,{foreignKey: 'subastaID'})
Producto.hasOne(registroSubasta,{foreignKey: 'productoID'})
Duenio.hasOne(registroSubasta,{foreignKey: 'duenioID'})


Persona.hasOne(Cliente,{foreignKey: 'identificador'})

Cliente.hasOne(Usuario,{foreignKey: 'idCliente',allowNull: true})