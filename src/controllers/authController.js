const prisma = require("../prismaClient");
const { comparePassword } = require("../utils/password");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !comparePassword(password, user.password)) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    req.session.userId = user.id;
    req.session.userName = user.name;
    req.flash("success", "Login successful");
    res.redirect("/projects");
  } catch (error) {
    req.flash("error", "An error occurred during login");
    res.redirect("/login");
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      req.flash("error", "User already exists with this email");
      return res.redirect("/register");
    }

    const { hashPassword } = require("../utils/password");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    });

    req.flash("success", "Registration successful. Please login.");
    res.redirect("/login");
  } catch (error) {
    req.flash("error", "An error occurred during registration");
    res.redirect("/register");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/projects");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

module.exports = {
  login,
  register,
  logout,
};
