// server.js - This is the backend entry point. The server starts from this file.

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors()); // Allow requests from React on a different port
app.use(express.json()); // Parse incoming JSON request bodies

// Routes
app.use("/api/auth", authRoutes); // Signup and login
app.use("/api/tasks", taskRoutes); // task CRUD

// Simple test route to check whether the server is running
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Connect to MongoDB, then start the server
const PORT = process.env.PORT || 5000;

async function startServer() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. Copy backend/.env.example to backend/.env and set your MongoDB Atlas connection string."
    );
  }
  if (["USERNAME", "PASSWORD", "CLUSTER_HOST"].some((placeholder) => mongoUri.includes(placeholder))) {
    throw new Error(
      "MONGO_URI still contains example placeholders. Replace USERNAME, PASSWORD, and CLUSTER_HOST with your MongoDB Atlas values."
    );
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");

  app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("MongoDB connection failed:", err.message);
  process.exitCode = 1;
});
