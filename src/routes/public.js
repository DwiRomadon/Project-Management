const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

// Public projects list
router.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: {
          include: {
            assignee: {
              select: {
                name: true,
              },
            },
          },
        },
        manager: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.render("public/projects", { projects });
  } catch (error) {
    console.error("Error fetching public projects:", error);
    res.status(500).render("error", { error: "Error loading projects" });
  }
});

// Public project detail
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        tasks: {
          include: {
            assignee: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            dueDate: "asc",
          },
        },
        manager: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).render("error", { error: "Project not found" });
    }

    res.render("public/project-detail", { project });
  } catch (error) {
    console.error("Error fetching public project:", error);
    res.status(500).render("error", { error: "Error loading project" });
  }
});

// Public tasks list
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        assignee: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    res.render("public/tasks", { tasks });
  } catch (error) {
    console.error("Error fetching public tasks:", error);
    res.status(500).render("error", { error: "Error loading tasks" });
  }
});

module.exports = router;
