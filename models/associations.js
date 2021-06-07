const { itemsCatalogo } = require("./index");
const db = require("./index");
const Producto = db.productos
const Catalogo = db.catalogos
const ItemsCatalogo = db.itemsCatalogo


//Item catalogo tiene un producto y un catalogo en el que esta
// ItemsCatalogo.belongsTo(Producto);
// ItemsCatalogo.belongsTo(Catalogo);

Producto.belongsToMany(Catalogo,{through:"ItemsCatalogo"})
Catalogo.belongsToMany(Producto,{through:"ItemsCatalogo"})
