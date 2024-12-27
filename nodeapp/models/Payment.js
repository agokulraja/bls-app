const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("./Service");
const User = require("./User");

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// fromDataId: DataTypes.INTEGER,
fromDataId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PickupDrops',
      key: 'id'
    },
    index: true // Add this line to create an index
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailSent: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Payment;
