require("dotenv").config();

module.exports = {
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
};
