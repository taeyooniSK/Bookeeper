require("dotenv").config();
const MYSQL_CONFIG = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    multipleStatements: true
};

module.exports = MYSQL_CONFIG;
