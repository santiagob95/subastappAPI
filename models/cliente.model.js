module.exports = (sequelize, Sequelize) => {
    const Clientes = sequelize.define("cliente", {
      identificador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      numeroPais: {
        type: Sequelize.STRING
      },
      admitido: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      verificador: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

    },{
        timestamps:false
    });
    // Clientes.belongsTo(Personas,{foreignKey: 'fk_clientes_personas'})
    // Clientes.belongsTo(Personas,{foreignKey: 'fk_clientes_empleados', targetKey: 'verificador'})
    // Clientes.belongsTo(Paises,{foreignKey: 'fk_clientes_paises', targetKey: 'numeroPais'})
    return Clientes;
  };