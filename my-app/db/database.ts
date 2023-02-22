export {};
const mysql = require("mysql2");
let db;
require('dotenv').config();
try {
    db = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user:'root',
    password: process.env.MYSQL_PW,
    database:'coin'
});
} catch (err) {
    console.error(err);
}
module.exports = db;