const express = require('express');
const path = require('path');
const router = express.Router();

const error = require('./error');

// router.get('/fruit', fruit.get);
// router.post('/fruit', fruit.post);
router.get("/",(req,res)=>{
  var x = path.join(__dirname,"..","..","..","public","layouts","index.html")
 res.sendFile(x)
})


router.use(error.client);
router.use(error.server);

module.exports = router;
