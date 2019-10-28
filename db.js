var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host: '192.168.122.167',
    user: 'djomla',
    password: 'djomla',
    database: 'djomla'
});

pool.getConnection(function (err) {
    if (!err) {
        console.log('Database Connected');
    } else {
        throw err;
    }
});

module.exports = pool;