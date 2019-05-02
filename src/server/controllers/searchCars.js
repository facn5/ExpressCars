const utils = require("../../utils/utils");
const sql = require("../../database/queries/sql");
const { verify } = require("jsonwebtoken");
const ppcookie = require("cookie");

const staticMSG = {
  msg: "Users need to login to access this part of the website",
  color: "black"
};

exports.search = (req, res, name, origin) => {
  sql.details(name, origin, (err, result) => {
    if (err) console.log(err);
    if (!err) {
      const cars = result.rows;

      if (!req.headers.cookie)
        res.render("layouts/loginPageLayout", {
          object: staticMSG
        });
      else {
        let jwt;
        try {
          jwt = ppcookie.parse(req.headers.cookie);
        } catch (error) {
          res.render("layouts/loginPageLayout", {
            object: staticMSG
          });
        }

        if (jwt) {
          verify(jwt.udetails, process.env.SECRET, (err, jwt) => {
            if (err)
              res.render("layouts/loginPageLayout", {
                object: staticMSG
              });

            const { u$u } = jwt;
            sql.getUsernamePassword(u$u, (err, result) => {
              if (err) console.log(err);
              else {
                if (result.rowCount == 0)
                  res.render("layouts/loginPageLayout", {
                    object: staticMSG
                  });
                else if (result.rowCount == 1) {
                  sql.getUsernamePassword(u$u, (err, result) => {
                    if (err) console.log(err);
                    else {
                      if (result.rowCount == 0)
                        res.render("layouts/loginPageLayout", {
                          object: staticMSG
                        });
                      else if (result.rowCount == 1) {
                        res.render("layouts/home", { cars, u$u });
                      }
                    }
                  });
                }
              }
            });
          });
        }
      }
    }
  });
};
