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

const getCarDetails = (name,origin, cb) =>
{
         const newName = `%${name}%`
  query.insert(
    "SELECT * from cars where name  LIKE $1 and origin =$2 LIMIT 9;",
    [newName,origin],
    cb
  );
}

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
  details:getCarDetails,
  createAccount: createAccount,
  getUsernameUsername: getUsernameWhereUsernameEqualsArg1,
  getUsernamePassword: getPasswordWhereUsernameEqualsArg1
};
