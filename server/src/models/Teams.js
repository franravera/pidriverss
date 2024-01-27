const { Sequelize } = require("sequelize")

const {DataTypes} = require ('Sequelize')

module.exports =(sequelize)=> {
    sequelize.define('Teams', {
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            

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
