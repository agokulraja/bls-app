const Users = require('./User');
const Service = require('./Service');
const FormData = require('./FormData');
const Payment = require('./Payment');
const PDForm = require('./PickDrop')
const Contact = require('./ContactUs');
const Comments = require('./Comments');

// Define associations
Service.hasMany(FormData, { foreignKey: 'serviceId', as: 'service' });
FormData.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Payment.hasOne(PDForm, { foreignKey: 'id', sourceKey: 'fromDataId', as: 'pickupDetails' });
PDForm.belongsTo(Payment, { foreignKey: 'id', targetKey: 'fromDataId', as: 'payment' });
PDForm.belongsTo(Service, { foreignKey: 'serviceSelectedId', as: 'service' });

PDForm.hasMany(Comments, {
    as: "comments",
    foreignKey: "pickDropId", 
  });
  
Comments.belongsTo(PDForm, {
    as: "pickDrop", 
    foreignKey: "pickDropId",
  });

Users.hasMany(Comments, {
    as: "userComments", 
    foreignKey: "userId", 
  });
  
  Comments.belongsTo(Users, {
    as: "commentUser", 
    foreignKey: "userId",
  });
  

module.exports = { Service, FormData, Payment ,PDForm ,Contact};