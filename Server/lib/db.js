const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "13579_issA?11",
  host: "localhost",
  port: 5432,
  database: "master",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
