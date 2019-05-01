const supertest = require("supertest");
const tape = require("tape");
const sql = require("../src/database/queries/sql");
const utils = require("../src/utils/utils");

const newUserToCheck = "faris1145";
const newPasswordToCheck = "faris1145Password";

tape("Creating account", t => {
  utils.hashPassword(newPasswordToCheck, (err, hashedPassword) => {
    if (err) t.end("Error while hashing the password");
    else {
      sql.createAccount(newUserToCheck, hashedPassword, (err, result) => {
        if (err) t.end("Error, account not created successufully");
        else {
          sql.getUsernamePassword(newUserToCheck, (err, result) => {
            if (err) t.end("Error, getting the password from the database");
            else {
              utils.comparePasswords(
                newPasswordToCheck,
                result.rows[0].password,
                (err, success) => {
                  if (err) t.end(err);
                  else {
                    t.equal(
                      success,
                      true,
                      "Hashed pass in db and should be equal"
                    );
                    t.end();
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});

tape.onFinish(() => process.exit(0));
