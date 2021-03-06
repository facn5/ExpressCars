const utils = require("../../utils/utils");
const sql = require("../../database/queries/sql");
const { sign, verify } = require("jsonwebtoken");
const ppcookie = require("cookie");

let cars = [];
const staticMSG = {
  msg: "Users need to login to access this part of the website",
  color: "black"
};

exports.login = (res, user, pass) => {
  if (user === "" || pass === "")
    res.render("layouts/registerPageLayout", {
      msg: "Invalid user credientals",
      color: "red"
    });
  sql.getCars((err, result) => {
    if (!err) {
      cars = result.rows;
    }
  });

  sql.getUsernamePassword(user, (err, result) => {
    if (err) console.log(err);
    else {
      if (result.rowCount == 0) {
        endObject = {
          msg: "Username doesn't exist!",
          color: "red"
        };
        res.render("layouts/loginPageLayout", {
          object: endObject
        });
      } else if (result.rowCount == 1) {
        utils.comparePasswords(
          pass,
          result.rows[0].password,
          (err, success) => {
            if (err)
              endObject = {
                msg: "invalid username/password!",
                color: "red"
              };
            else {
              if (success) {
                const userDetails = {
                  "content-type": "application/json",
                  u$u: user
                };

                const cookie = sign(userDetails, process.env.SECRET);

                let options = {
                  httpOnly: true
                };

                res.cookie("udetails", cookie, options);
                res.render("layouts/home", { cars: cars, u$u: user });
                return;
              } else {
                endObject = {
                  msg: "invalid username/password!",
                  color: "red"
                };
              }
            }
            res.render("layouts/loginPageLayout", {
              object: endObject
            });
          }
        );
      }
    }
  });
};

exports.checkauth = (res, req) => {
  sql.getCars((err, result) => {
    if (!err) {
      cars = result.rows;
    }
  });
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
              res.render("layouts/home", { cars: cars, u$u });
            }
          }
        });
      });
    }
  }
};
