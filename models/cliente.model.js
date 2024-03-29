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
        type: Sequelize.STRING,        
        validate:{
            isIn: [['si', 'no']]
            }
      },
      categoria: {
        type: Sequelize.STRING,        
        validate:{
            isIn: [['comun', 'especial','plata','oro','platino']]
            }
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