const query = require("./queries.js");

const getPasswordWhereUsernameEqualsArg1 = (username, cb) =>
  query.insert(
    "SELECT password from users where username = $1;",
    [username],
    cb
  );

const getCars = (cb,manufacturer,type,price)
query.insert("SELECT * from cars where manufacturer = $1 and type = $2 and price = $3 ",[manufacturer,type,price] ,cb);


module.exports = {
  getCars:getCars,
  getUsernamePassword: getPasswordWhereUsernameEqualsArg1
};
