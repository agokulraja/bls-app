const { FormData } = require('../models');
const axios = require('axios'); 

const serviceNames = {
  1: 'PCC',
  2: 'Passport-Renewal-Adult',
  3: 'Passport-Renewal-Minor',
  4: 'Passport-Surrender',
  5: 'OCI-Adult-Indian-Origin',
  6: 'OCI-Minor-Indian-Origin',
};

const trackApplications = async (req, res) => {
  const { passportNumber, dob } = req.body;

  try {
    const applications = await FormData.findAll({
      where: { passportNumber, dob }
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user.' });
    }


    const response = applications.map(app => ({
      applicationId: app.id,
      passportNumber: app.passportNumber,
      dob: app.dob,
      canadianMobNo: app.canadianMobNo,
      indianMobNo: app.indianMobNo,
      serviceId: app.serviceId,
      serviceName: serviceNames[app.serviceId] || 'Unknown Service',
      indianPassport: app.indianPassport,
      canadianStatus: app.canadianStatus,
      parentsPassport: app.parentsPassport,
      canadaAddressProof: app.canadaAddressProof,
      indianAddressProof: app.indianAddressProof,
      citizenshipCertificate: app.citizenshipCertificate,
      surrenderCertificate: app.surrenderCertificate,
      marriageCertificate: app.marriageCertificate,
      spouseCurrentPassport: app.spouseCurrentPassport,
      employmentLetter: app.employmentLetter,
      familyMemberOciCard: app.familyMemberOciCard,
      parentsCanadianStatus: app.parentsCanadianStatus,
      birthDistrict: app.birthDistrict,
      policeStation: app.policeStation,
      education: app.education,
      aadharCard: app.aadharCard,
      employmentStatus: app.employmentStatus,
      emergencyContactName: app.emergencyContactName,
      emergencyContactAddress: app.emergencyContactAddress,
      emergencyContactNumber: app.emergencyContactNumber,
      spouseOccupation: app.spouseOccupation,
      employmentAddress: app.employmentAddress,
      relativeName: app.relativeName,
      relativeAddress: app.relativeAddress,
      relativeAge: app.relativeAge,
      hasFamilyOci: app.hasFamilyOci
    }));
    return res.json({ applications: response });
  } catch (error) {
    console.error("Error retrieving applications:", error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


const trackShipment = async (req, res) => {
  const { trackingNumber } = req.body;
  try{
  const apiUrl = 'https://purolator.ts2000.net/quickTrack/List';
    const headers = {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      origin: 'https://purolator.ts2000.net',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      Cookie: 'ApplicationGatewayAffinity=a92016d577d49b1e992fcaa6349ef24c; ApplicationGatewayAffinityCORS=a92016d577d49b1e992fcaa6349ef24c',
    };
    const body = {
      trackingNumber,
      searchType: 0,
      searchTypeId: 0,
      startIndex: 0,
      limit: 10000,
      sort: null,
      quickTrackType: 0,
    };
    const response = await axios.post(apiUrl, body, { headers });

    res.status(200).json(response.data);
  }
catch (error) {
    console.error("Error retrieving applications:", error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { 
  trackApplications, trackShipment
};
