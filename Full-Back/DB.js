var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'djomla',
    multipleStatements: true
});

module.exports = pool;
