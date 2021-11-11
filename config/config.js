require("dotenv").config();

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: "database_test",
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: "database_production",
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
};
