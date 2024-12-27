const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const adminUsers = require("../models/User");
const service = require("../models/Service")
const PickDrop = sequelize.define(
  "PickupDrop",
  {
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceSelectedId:{
      type: DataTypes.INTEGER,
      alllowNull:true,
      references: {
        model: service,
        key: "id", 
      },
    },
    label:{
      type:DataTypes.STRING,
      allowNull:true
    },
    pickupTrackingNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 20], 
      },
    },
    dropoffTrackingNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 20],
      },
    },
    // New shipment status fields
    pickupShipmentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      
      validate: {
        len: [1, 20],
      },
    },
    dropoffShipmentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 20],
      },
      
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    pickupName: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    
    
    pickupPassportNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupContactNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric(value) {
          if (value && (!/^\d+$/.test(value) || value.length !== 10)) {
            throw new Error("Pickup contact number must contain exactly 10 numeric characters.");
          }
        },
      },
    },
    pickupEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupAddress1: {
      type: DataTypes.STRING,
    },
    pickupCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupPostalCode:  {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidPostalCode(value) {
          if (value && !/^[a-zA-Z0-9]{6}$/.test(value)) {
            throw new Error("Postal code must be exactly 6 alphanumeric characters.");
          }
        },
      },
    },
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pickupProvince: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupUpdaterId: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
        model: adminUsers,
        key: "id", 
      },
    },
    // Dropoff details
    serviceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dropoffName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dropoffPassportNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dropoffContactNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric(value) {
          if (value && (!/^\d+$/.test(value) || value.length !== 10)) {
            throw new Error("Dropoff contact number must contain exactly 10 numeric characters.");
          }
        },
      },
    },
    dropoffEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dropoffAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dropoffAddress1: {
      type: DataTypes.STRING,
    },
    dropoffCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dropoffPostalCode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidPostalCode(value) {
          if (value && !/^[a-zA-Z0-9]{6}$/.test(value)) {
            throw new Error("Postal code must be exactly 6 alphanumeric characters.");
          }
        },
      },
    },
    dropoffProvince: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    dropoffUpdaterId: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
        model: adminUsers,
        key: "id",
      },
    },
  },
  

  {
    timestamps: true,
  }
);

module.exports = PickDrop;

