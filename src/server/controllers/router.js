const express = require("express");


const router = express.Router();
const error = require("./error");
const login = require("./loginPage");
const register = require("./registerPage");
const {search} = require("./searchCars");

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/register??", (req, res) => {
  register.page(res);
});

router.post("/reg", ({ body }, res) => {
  register.reg(body.username, body.password, res);
});

router.get("/home", (req, res) => {
  login.checkauth(res, req);
});

router.post("/login", ({ body }, res) => {
  login.login(res, body.username, body.password);
});


router.post("/search", (req, res) => {
  search(req, res, req.body.name, req.body.origin);
});

router.get("/logout",(req, res) => {
  res.cookie('udetails', 'fahhkkh', {expires: new Date(0)})
  res.redirect("/");
})

router.use(error.client);

module.exports = router;
