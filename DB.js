var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host: 'localhost',
    user: 'djomla',
    password: 'djomla',
    database: 'djomla',
    multipleStatements: true
});

module.exports = pool;