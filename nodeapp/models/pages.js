const {DataTypes} = require('sequelize');
const sequelize = require("../config/database");

const Pages = sequelize.define('Pages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    pageName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    commonAccess:{
        type:DataTypes.STRING,
        allowNull: false
    } 
},{
    tableName: 'pages',
    timestamps: true,
})

module.exports = Pages