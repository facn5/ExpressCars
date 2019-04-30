const query = require("./queries.js");

const getPasswordWhereUsernameEqualsArg1 = (username, cb) =>
  query.insert(
    'SELECT password from users where username = $1;',
    username,
    cb
  );

module.exports = {
  getUsernamePassword: getPasswordWhereUsernameEqualsArg1
};
