const query = require("./queries.js");

const getPasswordWhereUsernameEqualsArg1 = (username, cb) =>
  query.insert(
    "SELECT password from users where username = $1;",
    [username],
    cb
  );

const getCars = (cb, manufacturer, type, price) =>
  query.insert(
    "SELECT * from cars where manufacturer = $1 and type = $2 and price = $3 ",
    [manufacturer, type, price],
    cb
  );

const getUsernameWhereUsernameEqualsArg1 = (username, cb) =>
  query.insert(
    `SELECT username from users where username = $1;`,
    [username],
    cb
  );

const createAccount = (username, password, cb) =>
  query.insert(
    `INSERT into users (username,password) VALUES ($1,$2);`,
    [username, password],
    cb
  );

module.exports = {
  getCars: getCars,
  createAccount: createAccount,
  getUsernameUsername: getUsernameWhereUsernameEqualsArg1,
  getUsernamePassword: getPasswordWhereUsernameEqualsArg1
};
