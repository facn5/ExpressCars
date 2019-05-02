const sql = require("../../database/queries/sql");
const { sign, verify } = require("jsonwebtoken");
const ppcookie = require("cookie");
const utils = require("../../utils/utils");

exports.page = res => {
  const endObject = {
    msg: "Users need to login to access this part of the website",
    color: "black"
  };
  res.render("layouts/registerPageLayout", endObject);
};

exports.reg = (user, pass, res) => {
  if (user === "" || pass === "")
    res.render("layouts/registerPageLayout", {
      msg: "Invalid user credientals",
      color: "red"
    });
  if (user != null && pass != null) {
    sql.getUsernameUsername(user, (err, result) => {
      if (err)
        res.render("layouts/registerPageLayout", {
          msg: "Please try again later!",
          color: "red"
        });
      else {
        if (result) {
          if (result.rowCount != 0)
            res.render("layouts/registerPageLayout", {
              msg: "Username already exists!",
              color: "red"
            });
          else {
            utils.hashPassword(pass, (err, hashedPass) => {
              if (err)
                res.render("layouts/registerPageLayout", {
                  msg: "Please try again later!",
                  color: "red"
                });
              else {
                sql.createAccount(user, hashedPass, (err, success) => {
                  if (err) console.log(err);
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
                      res.redirect("/home");
                    }
                  }
                });
              }
            });
          }
        } else
          res.render("layouts/registerPageLayout", {
            msg: "Please try again later!",
            color: "red"
          });
      }
    });
  }
};
