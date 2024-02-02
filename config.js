const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.dbPort,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
module.exports = pool;

