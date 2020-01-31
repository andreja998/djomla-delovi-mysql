const pool = require("../DB");

//Controler for creating new Maker
exports.createMaker = (req, res) => {
  if (!req.body.maker_name)
    return res
      .status(400)
      .json({ error: "Please provide a valid data for new Maker" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "INSERT INTO `MAKER` (`MAKER_NAME`) VALUES (?)",
      [req.body.maker_name],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          let lastInsertId_maker = result.insertId;
          return res.status(201).send({
            message: `Maker ${req.body.maker_name} is successfully added.`,
            maker_id: lastInsertId_maker
          });
        }
      }
    );
  });
};

//Controler for geting all Makers
exports.getAllMakers = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query("select * from `MAKER`", (error, result) => {
      connection.release();
      if (error) {
        res.status(500).json({
          message: `Something went wrong with our app or servers`,
          error: error
        });
      } else {
        if (result.length <= 0) {
          res.status(200).send(result);
        } else {
          res.status(200).json(result);
        }
      }
    });
  });
};

//Controler for geting one Maker
exports.getOneMaker = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "select * from `MAKER` where `MAKER_ID` = ?",
      [req.params.maker_id],
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.length <= 0) {
            res.status(200).send({ message: "Maker is not found." });
          } else {
            res.status(200).json(result);
          }
        }
        connection.release();
      }
    );
  });
};

//Controler for updating one Maker
exports.updateOneMaker = (req, res) => {
  if ((!req.body.maker_name, !req.body.maker_id))
    return res
      .status(400)
      .json({ message: "Please provide a valid data for updating Maker" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "UPDATE `MAKER` SET `MAKER_NAME` = ? WHERE `MAKER`.`MAKER_ID` = ?",
      [req.body.maker_name, req.body.maker_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(200).send({ message: "Maker is not found." });
          } else {
            res.status(201).send({
              message: `Maker with id=${req.body.maker_id} successfully updated to ${req.body.maker_name}.`
            });
          }
        }
      }
    );
  });
};

//Controler for deleting one Maker
exports.deleteOneMaker = (req, res) => {
  if (!req.body.maker_id)
    return res
      .status(400)
      .json({ message: "Please provide a valid data for updating Maker" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "DELETE FROM `MAKER` WHERE `MAKER`.`MAKER_ID` = ?",
      [req.body.maker_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(200).send({ message: "Model is not found." });
          } else {
            res.status(200).send({
              message: `Maker with id: ${req.body.maker_id} is successfully deleted.`
            });
          }
        }
      }
    );
  });
};
