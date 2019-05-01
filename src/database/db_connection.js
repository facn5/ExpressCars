const { Pool } = require("pg");
const url = require("url");

const env = require("env2");
env("config.env");

let type = "production";
let params;

if (type === "production") {
  if (!process.env.DATABASE_URL)
    throw new Error("Environment variable DATABASE_URL must be set");
} else {
  if (!process.env.HEROKU_POSTGRESQL_CYAN_URL)
    throw new Error("Environment variable DATABASE_URL must be set");
}

if (type === "production") params = url.parse(process.env.DATABASE_URL);
else params = url.parse(process.env.HEROKU_POSTGRESQL_CYAN_URL);

const [username, password] = params.auth.split(":");

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_MAX_CONNECTIONS || 2
};

if (username) {
  options.user = username;
}
if (password) {
  options.password = password;
}

options.ssl = options.host !== "localhost";

module.exports = new Pool(options);
