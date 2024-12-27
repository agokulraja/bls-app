const Permissions = require('../models/pagePermissions');

// Middleware to verify page-level access
const checkPagePermission = async (req, res, next) => {
  const { page } = req.query; // Pass the page name in query (e.g., '/admin')
  const userId = req.user.id; // Extract user ID from the decoded token

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