const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const authMiddleware = require("../middleware/authMiddleware");

// @route POST /api/blogs
// @desc  Create a new blog
router.post("/", authMiddleware, createBlog);

// @route GET /api/blogs
// @desc  Get all blogs
router.get("/", getAllBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Update blog (only author)
router.put("/:id", authMiddleware, updateBlog);

// Delete blog (only author)
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;