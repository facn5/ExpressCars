const query = require("./queries.js");

const getPasswordWhereUsernameEqualsArg1 = (username, cb) =>
  query.insert(
    "SELECT password from users where username = $1;",
    [username],
    cb
  );

const getCars = (cb) =>
  query.select(
    "SELECT * from CARS LIMIT 10;",
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
