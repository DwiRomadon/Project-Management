const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  listTasks,
  showTask,
} = require("../controllers/taskController");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

// Page routes
router.get("/", requireAuth, listTasks);
router.get("/:id", requireAuth, showTask);

// API routes
router.post("/", requireAuth, createTask);
router.post("/:id", requireAuth, updateTask);
router.patch("/:id/status", requireAuth, updateTaskStatus);
router.delete("/:id", requireAuth, deleteTask);

module.exports = router;
