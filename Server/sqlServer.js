const mysql = require('mysql');

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Manish@18",
    database: "csvdb"
});


module.exports = con;





















// const mysql = require('mysql');

// require("dotenv").config()
// const DB_HOST = process.env.DB_HOST
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_DATABASE = process.env.DB_DATABASE
// const DB_PORT = process.env.DB_PORT

// const con = mysql.createPool({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_DATABASE
// });
// console.log ("inside sql server")
// console.log(DB_HOST,DB_USER)
// module.exports = con;