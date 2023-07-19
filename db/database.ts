export {};
const mysql = require("mysql2");
let db;
try {
    db = mysql.createConnection({
    host: '127.0.0.1',
    port:'3306',
    user:'root',
    password: `${process.env.NEXT_PUBLIC_MYSQL_PW}`,
    database:'coin'
});
} catch (err) {
    console.error(err);
}
module.exports = db;