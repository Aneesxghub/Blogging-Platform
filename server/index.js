const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); 
const blogRoutes = require("./routes/blogRoutes");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/blogs", blogRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));
