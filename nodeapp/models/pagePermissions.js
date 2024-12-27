const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = require("./User");
const Page = require("./pages");
const Permissions = sequelize.define(
    'page-permissions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
      access: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
      },
    },
    {
      tableName: 'page-permissions',
      timestamps: true,
    }
  );
  Permissions.belongsTo(Page,{foreignKey : 'pageId'})
  Permissions.belongsTo(Users, { foreignKey: 'userId' }); 
  module.exports = Permissions;
  