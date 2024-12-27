const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageCreationController");

// Routes
router.get("/pages", pageController.getAllPages); // Get all pages
router.get("/pages/:id", pageController.getPageById); // Get a page by ID
router.post("/pages", pageController.createPage); // Create a new page
router.put("/pages/:id", pageController.updatePage); // Update a page
router.delete("/pages/:id", pageController.deletePage); // Delete a page

module.exports = router;
