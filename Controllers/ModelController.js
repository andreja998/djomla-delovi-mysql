const pool = require("../DB");

//Controler for creating new Model
exports.createModel = (req, res) => {
  if (!req.body.model_name)
    res
      .status(400)
      .json({ message: "Please provide a valid data for new Model" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "INSERT INTO `MODEL` (`MAKER_ID`, `MODEL_NAME`) VALUES (?, ?)",
      [req.body.maker_id, req.body.model_name],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          let lastInsertId_model = result.insertId;
          res.status(201).json({
            message: `Model ${req.body.model_name} is successfully added.`,
            model_id: lastInsertId_model
          });
        }
      }
    );
  });
};

//Controler for geting all Models
exports.getAllModels = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "select * from `MODEL` where `MAKER_ID` = ?",
      [req.body.maker_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.length <= 0) {
            res.status(200).json(result);
          } else {
            res.status(200).json(result);
          }
        }
      }
    );
  });
};

//Controler for geting one Model
exports.getOneModel = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "select * from `MODEL` where `MODEL_ID` = ?",
      [req.params.model_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.length <= 0) {
            res.status(200).json(result);
          } else {
            res.status(200).json(result);
          }
        }
      }
    );
  });
};

//Controler for updating one Model
exports.updateOneModel = (req, res) => {
  if ((!req.body.model_name, !req.body.model_id))
    return res
      .status(400)
      .json({ message: "Please provide a valid data for updating Model" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "UPDATE `MODEL` SET `MODEL_NAME` = ? WHERE `MODEL`.`MODEL_ID` = ?",
      [req.body.model_name, req.body.model_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(200).json(result);
          } else {
            res.status(201).json({
              message: `Model with id=${req.body.model_id} successfully updated to ${req.body.model_name}.`
            });
          }
        }
      }
    );
  });
};

//Controler for deleting one Model
exports.deleteOneModel = (req, res) => {
  if (!req.body.model_id)
    return res
      .status(400)
      .json({ message: "Please provide a valid data for deleting Model" });

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "DELETE FROM `MODEL` WHERE `MODEL`.`MODEL_ID` = ?",
      [req.body.model_id],
      (error, result) => {
        connection.release();
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.affectedRows == 0) {
            res.status(200).json("Model is not found.");
          } else {
            res
              .status(200)
              .json(
                `Model with id: ${req.body.model_id} is successfully deleted.`
              );
          }
        }
      }
    );
  });
};
