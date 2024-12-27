const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const adminUsers = require("../models/User");
const PickDrop = require("../models/PickDrop");
const Comments = sequelize.define(
  "Comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: adminUsers,
        key: "id",
      },
    },
    pickDropId: {
      type: DataTypes.INTEGER,
      references: {
        model: PickDrop,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Comments",
    timestamps: true,
  }
);

module.exports = Comments;
