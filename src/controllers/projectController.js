const prisma = require("../prismaClient");

const listProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        managerId: req.session.userId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.render("projects/list", { projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    req.flash("error", "Error fetching projects");
    res.redirect("/");
  }
};

const showProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
        managerId: req.session.userId,
      },
      include: {
        tasks: {
          include: {
            assignee: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!project) {
      req.flash("error", "Project not found");
      return res.redirect("/projects");
    }

    const users = await prisma.user.findMany();
    res.render("projects/show", { project, users });
  } catch (error) {
    console.error("Error fetching project:", error);
    req.flash("error", "Error fetching project");
    res.redirect("/projects");
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;

    console.log("Received data:", { name, description, startDate, endDate });

    const startDateISO = new Date(startDate + "T00:00:00.000Z").toISOString();
    const endDateISO = new Date(endDate + "T23:59:59.999Z").toISOString();

    console.log("Converted dates:", { startDateISO, endDateISO });

    await prisma.project.create({
      data: {
        name,
        description: description || "",
        startDate: startDateISO,
        endDate: endDateISO,
        managerId: req.session.userId,
      },
    });

    req.flash("success", "Project created successfully");
    res.redirect("/projects");
  } catch (error) {
    console.error("Error creating project:", error);
    req.flash("error", "Error creating project: " + error.message);
    res.redirect("/projects");
  }
};

// NEW: Function to show edit project form
const showEditProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
        managerId: req.session.userId,
      },
    });

    if (!project) {
      req.flash("error", "Project not found");
      return res.redirect("/projects");
    }

    res.render("projects/edit", { project });
  } catch (error) {
    console.error("Error fetching project for edit:", error);
    req.flash("error", "Error loading project for edit");
    res.redirect("/projects");
  }
};

// NEW: Function to update project
const updateProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const projectId = req.params.id;

    console.log("Updating project:", {
      projectId,
      name,
      description,
      startDate,
      endDate,
    });

    const startDateISO = new Date(startDate + "T00:00:00.000Z").toISOString();
    const endDateISO = new Date(endDate + "T23:59:59.999Z").toISOString();

    await prisma.project.update({
      where: {
        id: projectId,
        managerId: req.session.userId,
      },
      data: {
        name,
        description: description || "",
        startDate: startDateISO,
        endDate: endDateISO,
      },
    });

    req.flash("success", "Project updated successfully");
    res.redirect("/projects");
  } catch (error) {
    console.error("Error updating project:", error);
    req.flash("error", "Error updating project: " + error.message);
    res.redirect("/projects");
  }
};

// NEW: Function to delete project
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Delete all tasks associated with the project first
    await prisma.task.deleteMany({
      where: {
        projectId: projectId,
      },
    });

    // Then delete the project
    await prisma.project.delete({
      where: {
        id: projectId,
        managerId: req.session.userId,
      },
    });

    req.flash("success", "Project deleted successfully");
    res.redirect("/projects");
  } catch (error) {
    console.error("Error deleting project:", error);
    req.flash("error", "Error deleting project");
    res.redirect("/projects");
  }
};

module.exports = {
  listProjects,
  showProject,
  createProject,
  showEditProject, // NEW
  updateProject, // NEW
  deleteProject, // NEW
};
