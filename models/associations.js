const { itemsCatalogo, productos } = require("./index");
const db = require("./index");
const Producto = db.productos
const Catalogo = db.catalogos
const Subasta = db.subastas


//Item catalogo tiene un producto y un catalogo en el que esta
// ItemsCatalogo.belongsTo(Producto);
// ItemsCatalogo.belongsTo(Catalogo);


//N a N 
Producto.belongsToMany(Catalogo,{through:"ItemsCatalogo"})
Catalogo.belongsToMany(Producto,{through:"ItemsCatalogo"})


//1 a N
Subasta.hasMany(Catalogo, {foreignKey:"subastaID"})
Catalogo.belongsTo(Subasta,{foreignKey:"catalogoID"})