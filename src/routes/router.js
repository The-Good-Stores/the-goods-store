const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/login", (req, res) => {
  res.render("pages/login", { caution: "" });
});
router.get("/register", (req, res) => {
  res.render("pages/register", { caution: "" });
});
router.get("/post", (req, res) => {
  res.render("pages/post", { caution: "" });
});
router.get("/display", (req, res) => {
  res.render("pages/display", { caution: "" });
});
router.get("/edit", (req, res) => {
  res.render("pages/edit", { caution: "" });
});

module.exports = router;
