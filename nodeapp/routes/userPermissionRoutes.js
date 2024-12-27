const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/pagePermissionsController");
const { getUsersByDate ,updateStatusUser } = require("../controllers/userController");

// Routes
router.get("/permissions", permissionsController.getAllPermissions); // Get all permissions
router.post("/permissions", permissionsController.createPermission); // Create new permission
router.put("/permissions/:id", permissionsController.updatePermission); // Update permission
router.delete("/permissions/:id", permissionsController.deletePermission); // Delete permission
router.get("/permissions/check", permissionsController.checkUserAccess); // Check user access
router.get('/users/date',getUsersByDate);
router.patch('/user/:id/status',updateStatusUser);


module.exports = router;
