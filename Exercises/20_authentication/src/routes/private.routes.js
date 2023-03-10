import express from "express";

const privateRouter = express.Router();

privateRouter.get("/", auth, (req, res) => {
  const { firstName, lastName, age, user } = req.session;
  const profile = {
    user,
    firstName,
    lastName,
    age,
  };
  res.render("private", { style: "private.css", profile });
});

export default privateRouter;

function auth(req, res, next) {
  if (req.session.user) return next();
  else {
    return res.redirect("/login");
  }
}
