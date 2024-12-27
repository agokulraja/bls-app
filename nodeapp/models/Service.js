const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serviceName: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    comment: DataTypes.TEXT,
});

module.exports = Service;