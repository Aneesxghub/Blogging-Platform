const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const blog = new Blog({
      title,
      content,
      author: req.user.userId, // from middleware
    });

    await blog.save();
    res.status(201).json({ message: "Blog post created", blog });
  } catch (err) {
    console.error("Blog creation error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Get Blogs Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

// Update blog post by ID (only author can do it)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    const { title, content } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    res.status(200).json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// Delete blog post by ID (only author can do it)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};