const Pages = require("../models/pages");

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Pages.findAll();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pages", error });
  }
};

// Get a single page by ID
exports.getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Pages.findByPk(id);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch page", error });
  }
};

// Create a new page
exports.createPage = async (req, res) => {
  try {
    const { pageName, commonAccess } = req.body;

    // Validate input
    if (!pageName || !commonAccess) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPage = await Pages.create({ pageName, commonAccess });
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: "Failed to create page", error });
  }
};

// Update an existing page
exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { pageName, commonAccess } = req.body;

    const page = await Pages.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Update fields
    if (pageName) page.pageName = pageName;
    if (commonAccess) page.commonAccess = commonAccess;

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: "Failed to update page", error });
  }
};

// Delete a page
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Pages.findByPk(id);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    await page.destroy();
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete page", error });
  }
};
