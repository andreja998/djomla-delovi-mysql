const pool = require('../DB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) return res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query('SELECT * FROM `USER` WHERE `username` = ?', [req.body.username], (error, result) => {
            let token;

            if (result != null && result.length === 1) {
                bcrypt.compare(req.body.password, result[0].password, (error, success) => {
                    if (success) {
                        token = jwt.sign({ userId: result[0].id }, `key`, { expiresIn: '30s' });
                        connection.release();
                        res.status(200).json({ token: token });
                    } else {
                        res.status(401).json({ error: 'Password not valid' });
                    }
                });
            } else {
                return res.status(400).json({ message: 'User does not exist' });
            }
        });
    });
}