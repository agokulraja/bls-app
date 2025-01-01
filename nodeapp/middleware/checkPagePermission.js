const Permissions = require('../models/pagePermissions');

const checkPagePermission = async (req, res, next) => {
  const { page } = req.query; 
  const userId = req.user.id; 

  try {
    const permission = await Permissions.findOne({
      where: { userId, page },
    });

    if (!permission || !permission.access) {
      return res.status(403).json({ error: 'Access denied to this page' });
    }

    next();
  } catch (err) {
    console.error('Error checking page permission:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {checkPagePermission}