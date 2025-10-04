const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("error", "Please login to access this page");
    return res.redirect("/login");
  }
  next();
};

const requireGuest = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/projects");
  }
  next();
};

module.exports = {
  requireAuth,
  requireGuest,
};
