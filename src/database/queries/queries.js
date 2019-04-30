const databaseConnection = require("../db_connection");

const selectquery = (sql, cb) => {
  databaseConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const insertquery = (sql, args, cb) => {
  databaseConnection.query(sql, [args], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = {
  select: selectquery,
  insert: insertquery
};

// Copied from Tamer Nassar
