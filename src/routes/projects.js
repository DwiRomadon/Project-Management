const express = require("express");
const {
  listProjects,
  showProject,
  createProject,
  showEditProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireAuth, listProjects);
router.get("/:id", requireAuth, showProject);
router.get("/:id/edit", requireAuth, showEditProject); // NEW
router.post("/", requireAuth, createProject);
router.post("/:id", requireAuth, updateProject); // NEW
router.post("/delete/:id", requireAuth, deleteProject); // NEW

module.exports = router;
