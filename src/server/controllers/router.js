const express = require("express");
const path = require("path");

const router = express.Router();
const error = require("./error");
const login = require("./loginPage");
const register = require("./registerPage");
const search = require("./searchCars")

// router.get('/fruit', fruit.get);
// router.post('/fruit', fruit.post);
router.get("/", (req, res) => {
  res.redirect('/home');
})

router.get("/register??", (req, res) => {
  register.page(res);
})

router.post('/reg', ( { body }, res) => {
  register.reg(body.username, body.password, res);
});

router.get("/home", (req, res) => {
  login.checkauth(res, req);
});


router.post("/login", ({ body }, res) => {
  login.login(res, body.username, body.password);
});

router.post("/search",({body},res)=>{
search.search(res,body.name,body.origin)
})
router.use(error.client);
// router.use(error.server);
module.exports = router;
