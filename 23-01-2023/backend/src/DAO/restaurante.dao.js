const mysql = require("mysql")

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'aula01'
})

module.exports = con