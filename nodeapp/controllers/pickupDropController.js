const FormData = require('../models/PickDrop');
const Users = require('../models/User')

// Create new form data
const PDCreateFormData = async (req, res) => {
  try {
    const { pickup, dropoff } = req.body;

    const formData = await FormData.create({
      cost:Number(pickup.cost),
      serviceType:pickup.serviceType,
      pickupName: pickup.name,
      serviceSelectedId:pickup.serviceSelectedId,
      pickupPassportNo: pickup.passportNo,
      pickupContactNo: pickup.contactNo,
      pickupEmail: pickup.email,
      pickupAddress: pickup.address,
      pickupAddress1: pickup.address1,
      pickupCity: pickup.city,
      pickupPostalCode: pickup.postalCode,
      pickupDate: pickup.pickupDate,
      pickupProvince: pickup.province,
      packageLocation: pickup.packageLocation,
      pickupTime: pickup.pickupTime,
      seriviceName:dropoff.service,
      dropoffName: dropoff.name,
      dropoffPassportNo: dropoff.passportNo,
      dropoffContactNo: dropoff.contactNo,
      dropoffEmail: dropoff.email,
      dropoffAddress: dropoff.address,
      dropoffAddress1: dropoff.address1,
      dropoffCity: dropoff.city,
      dropoffPostalCode: dropoff.postalCode,
      dropoffProvince: dropoff.province,
    });

    res.status(201).json({
      success: true,
      data: formData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all form data
const PDGetAllFormData = async (req, res) => {
  try {
    const formData = await FormData.findAll();
    res.status(200).json({
      success: true,
      count: formData.length,
      data: formData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single form data
const PDGetFormDataById = async (req, res) => {
  try {
    const id = req.params.id
    const formData = await FormData.findByPk(req.params.id);
    if (!formData) {
      return res.status(404).json({
        success: false,
        error: 'Form data not found'
      });
    }
    res.status(200).json({
      success: true,
      data: formData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete form data
const PDDeleteFormData = async (req, res) => {
  try {
    const formData = await FormData.findByPk(req.params.id);
    if (!formData) {
      return res.status(404).json({
        success: false,
        error: 'Form data not found'
      });
    }
    await formData.destroy();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const UpdateLabel = async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;
  console.log("Received ID:", id);
  console.log("Received Label:", label);

  try {
    const formData = await FormData.findByPk(id);
    if (!formData) {
      console.log(`No user found with ID ${id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Current Record:", formData);
    formData.label = label;
    const result = await formData.save();
    console.log("Updated Record:", result);

    return res.status(201).json({ message: 'Label is added' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

const UpdatePickUpTracking = async (req, res) => {
  const { id } = req.params;
  const { pickupTrackingNo } = req.body;
  console.log("Received Pick ID:", id);
  console.log("Received pickupTrackingNo:", pickupTrackingNo);

  try {
    const formData = await FormData.findByPk(id);
    if (!formData) {
      console.log(`No user found with ID ${id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Current Record:", formData);
    formData.pickupTrackingNo = pickupTrackingNo;
    const result = await formData.save();
    console.log("Updated Record:", result);

    return res.status(201).json({ message: 'pickupTrackingNo is added' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

const UpdateDropOffTracking = async (req, res) => {
  const { id } = req.params;
  const { dropoffTrackingNo } = req.body;
  console.log("Received ID:", id);
  console.log("Received dropoffTrackingNo:", dropoffTrackingNo);

  try {
    const formData = await FormData.findByPk(id);
    if (!formData) {
      console.log(`No user found with ID ${id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Current Record:", formData);
    formData.dropoffTrackingNo = dropoffTrackingNo;
    const result = await formData.save();
    console.log("Updated Record:", result);

    return res.status(201).json({ message: 'dropoffTrackingNo is added' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
};

// const UpdateStatus = async (req, res) => {
//   const { trackingNo, status, service } = req.body; 
//   console.log("Received Tracking No:", trackingNo);
//   console.log("Status:", status);
//   console.log("Service:", service);

//   try {
//     let formData;
//     if (service === "pick") {
//       // Find record based on pickupTrackingNo
//       formData = await FormData.findOne({ where: { pickupTrackingNo: trackingNo } });
//       if (!formData) {
//         console.log(`No record found with pickupTrackingNo ${trackingNo}`);
//         return res.status(404).json({ error: 'Record not found for pickupTrackingNo' });
//       }
//       // Update pickupShipmentStatus
//       console.log("Current Record (Pick):", formData);
//       formData.pickupShipmentStatus = status;
//     } 
//     else if (service === "drop") {
//       // Find record based on dropoffTrackingNo
//       formData = await FormData.findOne({ where: { dropoffTrackingNo: trackingNo } });
//       if (!formData) {
//         console.log(`No record found with dropoffTrackingNo ${trackingNo}`);
//         return res.status(404).json({ error: 'Record not found for dropoffTrackingNo' });
//       }
//       // Update dropoffShipmentStatus
//       console.log("Current Record (Drop):", formData);
//       formData.dropoffShipmentStatus = status;
//     }
//     else {
//       console.log("Invalid service type provided");
//       return res.status(400).json({ error: 'Invalid service type' });
//     }
//     // Save the updated record
//     const result = await formData.save();
//     console.log("Updated Record:", result);
//     return res.status(200).json({ message: 'Shipment status updated successfully' });
//   } 
//   catch (err) {
//     console.error(`Error updating record with trackingNo ${trackingNo}:`, err);
//     return res.status(500).json({ error: 'Database error' });
//   }
// };
const updateShipmentStatus = async (req, res) => {
  const { trackingNo, status, service, userId } = req.body; 

  console.log("Request to update shipment status received.");
  console.log("Tracking No:", trackingNo);
  console.log("Status:", status);
  console.log("Service:", service);

  try {
      let record;

      if (service === "pick") {
          // Fetch record based on pickupTrackingNo
          record = await FormData.findOne({ where: { pickupTrackingNo: trackingNo } });
          if (!record) {
              return res.status(404).json({ error: `No record found for pickupTrackingNo: ${trackingNo}` });
          }
          record.pickupShipmentStatus = status; 
          record.pickupUpdaterId = userId;// Update status for pickup
      } 
      else if (service === "drop") {
          // Fetch record based on dropoffTrackingNo
          record = await FormData.findOne({ where: { dropoffTrackingNo: trackingNo } });
          if (!record) {
              return res.status(404).json({ error: `No record found for dropoffTrackingNo: ${trackingNo}` });
          }
          record.dropoffShipmentStatus = status;
          record.dropoffUpdterId; // Update status for dropoff
      } 
      else {
          return res.status(400).json({ error: "Invalid service type provided" });
      }

      // Save the updated record to the database
      await record.save();

      return res.status(200).json({ message: "Shipment status updated successfully", record });
  } 
  catch (error) {
      console.error("Error while updating shipment status:", error);
      return res.status(500).json({ error: "An internal server error occurred" });
  }
};

module.exports = { PDDeleteFormData, PDGetFormDataById, PDGetAllFormData, PDCreateFormData, updateShipmentStatus,UpdateDropOffTracking, UpdatePickUpTracking };