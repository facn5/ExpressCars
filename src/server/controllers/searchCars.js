const sql = require("../../database/queries/sql");


exports.search = (res,name,origin) => {
  sql.details(name,origin, (err, result) => {
    console.log(err);
    if(!err) {
     const cars = result.rows;

     res.render('layouts/home', {cars: cars})
    }
  })}
