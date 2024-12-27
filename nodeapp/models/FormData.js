const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Service = require('./Service');
const Users = require('./User');

const FormData = sequelize.define('FormData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    },
    email :{
        type: DataTypes.STRING,
        allowNull: false,

    },
    indianPassport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    canadianStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parentsPassport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    canadaAddressProof: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    indianAddressProof: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    citizenshipCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    surrenderCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    marriageCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spouseCurrentPassport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    employmentLetter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    familyMemberOciCard: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parentsCanadianStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policeStation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aadharCard: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    indianMobNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    canadianMobNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    employmentStatus: {
        type: DataTypes.ENUM('Student', 'Unemployed', 'Self Employed', 'Private', 'Others'),
        allowNull: true,
    },
    emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emergencyContactAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emergencyContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spouseOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    employmentAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    relativeName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    relativeAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    relativeAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    hasFamilyOci: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    dob:{
        type: DataTypes.DATEONLY, 
        allowNull:true,
    },
    passportNumber:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'FormData', 
});

module.exports = FormData;