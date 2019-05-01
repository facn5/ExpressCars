const utils = require("../../utils/utils");
const sql = require("../../database/queries/sql");
const { sign, verify } = require("jsonwebtoken");
const ppcookie = require("cookie");

let cars = [];


exports.login = (res, user, pass) => {
  sql.getCars( (err, result) => {
    if(!err) {
     cars = result.rows;
    }
  })

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
                  u$u: user,
                  u$p: pass
                };

                const cookie = sign(userDetails, process.env.SECRET);

                let options = {
                  httpOnly: true
                };

                res.cookie("udetails", cookie, options);
                res.render("layouts/home", {cars: cars});
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
  sql.getCars( (err, result) => {
    if(!err) {
     cars = result.rows;
    }
  })
  if (!req.headers.cookie)
    res.render("layouts/loginPageLayout", {
      object: {
        msg: "Users need to login to access this part of the website",
        color: "black"
      }
    });
  else {
    let jwt;
    try {
      jwt = ppcookie.parse(req.headers.cookie);
    } catch (error) {
      res.render("layouts/loginPageLayout", {
        object: {
          msg: "Users need to login to access this part of the website",
          color: "black"
        }
      });
    }

    if (jwt) {
      verify(jwt.udetails, process.env.SECRET, (err, jwt) => {
        if (err)
          res.render("layouts/loginPageLayout", {
            object: {
              msg: "Users need to login to access this part of the website",
              color: "black"
            }
          });

        const { u$u, u$p } = jwt;
        sql.getUsernamePassword(u$u, (err, result) => {
          if (err) console.log(err);
          else {
            if (result.rowCount == 0)
              res.render("layouts/loginPageLayout", {
                object: {
                  msg: "Users need to login to access this part of the website",
                  color: "black"
                }
              });
            else if (result.rowCount == 1) {
              utils.comparePasswords(
                u$p,
                result.rows[0].password,
                (err, success) => {
                  if (err)
                    res.render("layouts/loginPageLayout", {
                      object: {
                        msg:
                          "Users need to login to access this part of the website",
                        color: "black"
                      }
                    });
                  else {
                    if (success) res.render("layouts/home", {cars: cars});
                    else
                      res.render("layouts/loginPageLayout", {
                        object: {
                          msg:
                            "Users need to logins to access this part of the website",
                          color: "black"
                        }
                      });
                  }
                }
              );
            }
          }
        });
      });
    }
  }
};
