const {sequelize} = require ('sequelize')
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const path = require('path');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: (driver, options) => {
        // Si no se proporciona una imagen, establecer la imagen por defecto
        if (!driver.image) {
          const defaultImageURL = 'https://media.gq.com.mx/photos/62041b2243f71a078a35506d/master/w_1600,c_limit/SI202202090260_hires_jpeg_24bit_rgb%20(1).jpg';
          driver.image = defaultImageURL;
        }
      },
    },
  });
};