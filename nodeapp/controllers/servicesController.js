const FormData = require('../models/FormData');
const Service = require('../models/Service');

// Create a new FormData entry
const createFormData = async (req, res) => {
    const dataToSubmit  = req.body;

    try {
        // Example: Validate required fields (add more as necessary)
        if (!dataToSubmit.serviceId) {
            return res.status(400).json({ message: 'Service ID and User ID are required' });
        }
        // Further processing if needed
        const formDataPayload = {
            email:dataToSubmit.email,
            serviceId: dataToSubmit.serviceId,
            dob:dataToSubmit.dob,
            passportNumber: dataToSubmit.passportNumber,
            indianPassport: dataToSubmit.indianPassport || null,
            canadianStatus: dataToSubmit.canadianStatus || null,
            parentsPassport: dataToSubmit.parentsPassport || null,
            canadaAddressProof: dataToSubmit.canadaAddressProof || null,
            indianAddressProof: dataToSubmit.indianAddressProof || null,
            citizenshipCertificate: dataToSubmit.citizenshipCertificate || null,
            surrenderCertificate: dataToSubmit.surrenderCertificate || null,
            marriageCertificate: dataToSubmit.marriageCertificate || null,
            spouseCurrentPassport: dataToSubmit.spouseCurrentPassport || null,
            employmentLetter: dataToSubmit.employmentLetter || null,
            familyMemberOciCard: dataToSubmit.familyMemberOciCard || null,
            parentsCanadianStatus: dataToSubmit.parentsCanadianStatus || null,
            birthDistrict: dataToSubmit.birthDistrict || null,
            policeStation: dataToSubmit.policeStation || null,
            education: dataToSubmit.education || null,
            aadharCard: dataToSubmit.aadharCard || null,
            indianMobNo: dataToSubmit.indianMobNo || null,
            canadianMobNo: dataToSubmit.canadianMobNo || null,
            employmentStatus: dataToSubmit.employmentStatus || null,
            emergencyContactName: dataToSubmit.emergencyContactName || null,
            emergencyContactAddress: dataToSubmit.emergencyContactAddress || null,
            emergencyContactNumber: dataToSubmit.emergencyContactNumber || null,
            spouseOccupation: dataToSubmit.spouseOccupation || null,
            employmentAddress: dataToSubmit.employmentAddress || null,
            relativeName: dataToSubmit.relativeName || null,
            relativeAddress: dataToSubmit.relativeAddress || null,
            relativeAge: dataToSubmit.relativeAge || null,
            hasFamilyOci: dataToSubmit.hasFamilyOci || false,
        };

        // Create entry only if all checks pass
        const formData = await FormData.create(formDataPayload);
        res.status(201).json(formData); // Return created entry

    } catch (error) {
        
        res.status(500).json({ message: 'Error creating FormData', error });
    }
};


// Get all FormData entries
const getAllFormData = async (req, res) => {
    try {
        const formData = await FormData.findAll();
        res.status(200).json(formData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FormData', error });
    }
};

// Get a single FormData entry by ID
// const getFormDataById = async (req, res) => {
//     try {
//         const formData = await FormData.findByPk(req.params.id);
//         if (!formData) {
//             return res.status(404).json({ message: 'FormData not found' });
//         }
//         res.status(200).json(formData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching FormData', error });
//     }
// };

const getFormDataById = async (req, res) => {
    try {
        const formData = await FormData.findByPk(req.params.id, {
            include: {
                model: Service,
                as: 'service', // This should match the alias used in the association definition
                attributes: ['id', 'serviceName', 'description', 'price', 'comment']
            }
        });
        
        if (!formData) {
            return res.status(404).json({ message: 'FormData not found' });
        }
        res.status(200).json(formData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FormData', error });
    }
};

// Delete a FormData entry by ID
const deleteFormData = async (req, res) => {
    try {
        const formData = await FormData.findByPk(req.params.id);
        if (!formData) {
            return res.status(404).json({ message: 'FormData not found' });
        }
        await formData.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FormData', error });
    }
};

// Updating a form
const updateFormData = async (req, res) => {
    try {
        const formData = await FormData.findByPk(req.params.id);
        if (!formData) {
            return res.status(404).json({ message: 'FormData not found' });
        }
        const dataToUpdate = req.body;
        if (!dataToUpdate.serviceId) {
            return res.status(400).json({ message: 'Service ID is required' });
        }
        const updatedFormData = await formData.update({

            serviceId: dataToUpdate.serviceId,
            dob:dataToUpdate.dob,
            passportNumber: dataToUpdate.passportNumber,
            indianPassport: dataToUpdate.indianPassport || formData.indianPassport,
            canadianStatus: dataToUpdate.canadianStatus || formData.canadianStatus,
            parentsPassport: dataToUpdate.parentsPassport || formData.parentsPassport,
            canadaAddressProof: dataToUpdate.canadaAddressProof || formData.canadaAddressProof,
            indianAddressProof: dataToUpdate.indianAddressProof || formData.indianAddressProof,
            citizenshipCertificate: dataToUpdate.citizenshipCertificate || formData.citizenshipCertificate,
            surrenderCertificate: dataToUpdate.surrenderCertificate || formData.surrenderCertificate,
            marriageCertificate: dataToUpdate.marriageCertificate || formData.marriageCertificate,
            spouseCurrentPassport: dataToUpdate.spouseCurrentPassport || formData.spouseCurrentPassport,
            employmentLetter: dataToUpdate.employmentLetter || formData.employmentLetter,
            familyMemberOciCard: dataToUpdate.familyMemberOciCard || formData.familyMemberOciCard,
            parentsCanadianStatus: dataToUpdate.parentsCanadianStatus || formData.parentsCanadianStatus,
            birthDistrict: dataToUpdate.birthDistrict || formData.birthDistrict,
            policeStation: dataToUpdate.policeStation || formData.policeStation,
            education: dataToUpdate.education || formData.education,
            aadharCard: dataToUpdate.aadharCard || formData.aadharCard,
            indianMobNo: dataToUpdate.indianMobNo || formData.indianMobNo,
            canadianMobNo: dataToUpdate.canadianMobNo || formData.canadianMobNo,
            employmentStatus: dataToUpdate.employmentStatus || formData.employmentStatus,
            emergencyContactName: dataToUpdate.emergencyContactName || formData.emergencyContactName,
            emergencyContactAddress: dataToUpdate.emergencyContactAddress || formData.emergencyContactAddress,
            emergencyContactNumber: dataToUpdate.emergencyContactNumber || formData.emergencyContactNumber,
            spouseOccupation: dataToUpdate.spouseOccupation || formData.spouseOccupation,
            employmentAddress: dataToUpdate.employmentAddress || formData.employmentAddress,
            relativeName: dataToUpdate.relativeName || formData.relativeName,
            relativeAddress: dataToUpdate.relativeAddress || formData.relativeAddress,
            relativeAge: dataToUpdate.relativeAge || formData.relativeAge,
            hasFamilyOci: dataToUpdate.hasFamilyOci !== undefined ? dataToUpdate.hasFamilyOci : formData.hasFamilyOci,
        });
        res.status(200).json(updatedFormData);

    } catch (error) {
        res.status(500).json({ message: 'Error updating FormData', error });
    }
};

module.exports = {updateFormData,deleteFormData , getFormDataById, getAllFormData, createFormData}