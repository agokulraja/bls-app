const Permissions = require("../models/pagePermissions");
const Users = require("../models/User");
const Pages = require("../models/pages");

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.findAll({
      include: [
        { model: Users, attributes: ["id", "username", "email"] },
        { model: Pages, attributes: ["id", "pageName", "commonAccess"] },
      ],
    });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch permissions", error });
  }
};

// Create new permission
exports.createPermission = async (req, res) => {
  try {
    const { userId, pageId, access } = req.body;
    const newPermission = await Permissions.create({ userId, pageId, access });
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ message: "Failed to create permission", error });
  }
};

// Update a permission
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { access } = req.body;

    const permission = await Permissions.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    permission.access = access;
    await permission.save();
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Failed to update permission", error });
  }
};



// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permissions.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.destroy();
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete permission", error });
  }
};

exports.checkUserAccess = async (req, res) => {

  try {
    let { userId, pageId } = req.query;
    console.log("Received userId:", userId, "Received pageId:", pageId);

    if (!userId || !pageId) {
      return res.status(400).json({ message: "Missing userId or pageId" });
    }

    userId = parseInt(userId, 10);
    pageId = parseInt(pageId, 10);

    if (!Number.isInteger(userId) || !Number.isInteger(pageId)) {
      return res.status(400).json({ message: "Invalid userId or pageId. Must be numeric." });
    }

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)

    if (!user.status) {
      return res.status(403).json({ message: "User has no access to the application" });
    }

    const permission = await Permissions.findOne({
      where: { userId, pageId },
    });

    console.log("Permission found:", permission);

    if (!permission) {
      const page = await Pages.findByPk(pageId);

      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      const commonAccessRoles = page.commonAccess.split(", ");
      if (commonAccessRoles.includes(user.role)) {
        return res.status(200).json({ message: "User has access to the page" });
      }

      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "Access granted" });
  } catch (error) {
    console.error("Error in checkUserAccess:", error);
    res.status(500).json({ message: "Failed to check access", error });
  }
};



// exports.checkUserAccess = async (req, res) => {
//   console.log("hitting checkUserAccess");
//   try {
//     const { userId, pageId } = req.query;


//     if (!userId || !pageId) {
//       return res.status(400).json({ message: "Missing userId or pageId" });
//     }

//     const user = await Users.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.status) {
//       return res.status(403).json({ message: "User has no access to the application" });
//     }

//     const permission = await Permissions.findOne({
//       where: { userId, pageId },
//     });
//     console.log(permission,"permission")

//     console.log("permissions",permission)

//     if (!permission) {
//       const page = await Pages.findByPk(pageId);

//       if (!page) {
//         return res.status(404).json({ message: "Page not found" });
//       }

//       const commonAccessRoles = page.commonAccess.split(", ");

//       if (commonAccessRoles.includes(user.role)) {
//         return res.status(200).json({ message: "User has access to the page" });
//       }

//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.status(200).json({ message: "Access granted" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to check access", error });
//   }
// };


