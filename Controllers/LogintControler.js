const pool = require("../DB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      return res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "SELECT * FROM `USER` JOIN `ROLE` USING(ROLE_ID) WHERE `USER`.`username` = ?",
      [req.body.username],
      (error, result) => {
        let token;

        if (result != null) {
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (error, success) => {
              if (success) {
                token = jwt.sign(
                  { userId: result[0].id, role: result[0].ROLE_NAME },
                  `key`,
                  { expiresIn: "2h" }
                );
                connection.release();
                res.status(200).json({ token: token, rez: result });
              } else {
                res.status(401).json({ error: "Password not valid" });
              }
            }
          );
        } else {
          return res.status(400).json({ message: "User does not exist" });
        }
      }
    );
  });
};
