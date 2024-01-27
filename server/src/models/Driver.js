const {sequelize} = require ('sequelize')
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,

    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false

    },
    nationality:{
      type:DataTypes.STRING,
      allowNull:false

    },
    birth:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    
  },
  {
    freezeTableName:true,
    timestamps: false
  });
};