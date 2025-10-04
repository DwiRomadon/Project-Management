const path = require("path");
const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../src/views/public")));

// Routes
const authRoutes = require("../src/routes/auth");
const projectRoutes = require("../src/routes/projects");
const taskRoutes = require("../src/routes/tasks");
const publicRoutes = require("../src/routes/public");

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/", publicRoutes);

// Export handler for Vercel
module.exports.handler = serverless(app);
