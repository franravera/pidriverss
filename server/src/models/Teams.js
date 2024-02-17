const { Sequelize } = require("sequelize")

const {DataTypes} = require ('sequelize')

module.exports =(sequelize)=> {
    sequelize.define('Teams', {
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,

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
