const express = require("express");
const path = require("path");

const router = express.Router();
const error = require("./error");
const login = require("./loginPage");

// router.get('/fruit', fruit.get);
// router.post('/fruit', fruit.post);
router.get("/home", (req, res) => {
  login.checkauth(res, req);
});

router.post("/login", ({ body }, res) => {
  login.login(res, body.username, body.password);
});

router.use(error.client);
// router.use(error.server);
module.exports = router;
