const { Sequelize } = require("sequelize")

const {DataTypes} = require ('sequelize')

module.exports =(sequelize)=> {
    sequelize.define('Teams', {
        id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false, 

        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,

        },
       

    },
    {
        freezeTableName:true,
        timestamps: false
      }
    )};