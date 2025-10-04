const prisma = require("../prismaClient");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assigneeId, projectId } =
      req.body;

    // Convert dueDate to Date object
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(23, 59, 59, 999);

    const taskData = {
      title,
      description,
      dueDate: dueDateObj,
      priority,
      projectId,
      ...(assigneeId && { assigneeId }), // Only include assigneeId if provided
    };

    await prisma.task.create({
      data: taskData,
    });

    req.flash("success", "Task created successfully");
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error("Error creating task:", error);
    req.flash("error", "Error creating task: " + error.message);
    res.redirect(`/projects/${req.body.projectId}`);
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      assigneeId,
      projectId,
      status,
    } = req.body;

    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(23, 59, 59, 999);

    const taskData = {
      title,
      description,
      dueDate: dueDateObj,
      priority,
      status,
      ...(assigneeId && { assigneeId }),
    };

    await prisma.task.update({
      where: { id: req.params.id },
      data: taskData,
    });

    req.flash("success", "Task updated successfully");
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error("Error updating task:", error);
    req.flash("error", "Error updating task");
    res.redirect(`/projects/${req.body.projectId}`);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: { id: req.params.id },
    });

    req.flash("success", "Task deleted successfully");
    res.redirect(`/projects/${task.projectId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    req.flash("error", "Error deleting task");
    res.redirect("/projects");
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status },
    });

    req.flash("success", "Task status updated successfully");
    res.redirect(`/projects/${task.projectId}`);
  } catch (error) {
    console.error("Error updating task status:", error);
    req.flash("error", "Error updating task status");
    res.redirect("/projects");
  }
};

// Get all tasks for listing
const listTasks = async (req, res) => {
  try {
    const { status, priority, assigneeId } = req.query;

    const where = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assigneeId) where.assigneeId = assigneeId;

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    const users = await prisma.user.findMany();
    res.render("tasks/list", { tasks, users });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    req.flash("error", "Error fetching tasks");
    res.redirect("/projects");
  }
};

// Get single task for detail page
const showTask = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      req.flash("error", "Task not found");
      return res.redirect("/tasks");
    }

    const users = await prisma.user.findMany();
    res.render("tasks/show", { task, users });
  } catch (error) {
    console.error("Error fetching task:", error);
    req.flash("error", "Error fetching task");
    res.redirect("/tasks");
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  listTasks,
  showTask,
};
