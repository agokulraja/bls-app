const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ServicesPayments = sequelize.define("ServicesPayments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ServicesId: DataTypes.INTEGER,
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
    unique: true,
  },
});

module.exports = ServicesPayments;
