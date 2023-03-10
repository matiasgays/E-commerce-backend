import express from "express";

const viewRouter = express.Router();
const path = "./src/dao/fileSystem/products.json";

viewRouter.get("/", auth, (req, res) => {
  const { firstName, lastName, age, user, admin } = req.session;
  const profile = {
    user,
    firstName,
    lastName,
    age,
    admin,
  };
  res.render("products", { style: "index.css", profile });
});

// viewRouter.get("/:pid", (req, res) => {
//   res.render("productDetail", { style: "productDetail.css" });
// });

viewRouter.get("/cart/:cid", (req, res) => {
  res.render("cartId", { style: "cartId.css" });
});

export default viewRouter;

function auth(req, res, next) {
  if (req.cookies.mello) return next();
  else {
    return res.redirect("/login");
  }
}
