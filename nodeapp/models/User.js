const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define(
  'adminUsers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'superadmin', 'user'], 
      allowNull: false, 
      defaultValue: 'user', 
    },
  },
  {
    tableName: 'adminUsers', 
    timestamps: true, 
  }
);

module.exports = Users;
