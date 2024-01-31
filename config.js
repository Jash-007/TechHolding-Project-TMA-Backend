const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.dbport,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
module.exports = pool;
// pool.end().then(() => console.log("Connection pool closed"))
// .catch((err) => console.error("Error closing connection pool", err));

// function remove(params) {
//   // Event listener for client disconnection
//   pool.on("remove", (client) => {
//     console.log("Client removed from the connection pool");
//   });
// }

// function db_error(params) {
//   // Event listener for errors
//   pool.on("error", (err, client) => {
//     console.error("Unexpected error on idle client", err);
//   });
// }

// export { open_connection, close_connection, remove, db_error };
