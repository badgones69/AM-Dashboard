const Database = require("better-sqlite3");
const db = new Database("./src/db/AM-Dashboard.db");

module.exports = db;
