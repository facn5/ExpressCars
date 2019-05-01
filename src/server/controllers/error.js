const path = require("path");

exports.client = (req, res) => {
  res.render('layouts/404');
};

exports.server = (err, req, res, next) => {
  res.render('layouts/500');

};
