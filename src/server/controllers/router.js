const express = require('express');
const path = require('path');
const router = express.Router();

const error = require('./error');

// router.get('/fruit', fruit.get);
// router.post('/fruit', fruit.post);

router.get('/submit-form', (req, res) => {
  //...
  res.sendFile(path.join(__dirname, "..", "..", "..", "public", "layouts", "index.html"))
})
router.use(error.client);
router.use(error.server);

module.exports = router;
