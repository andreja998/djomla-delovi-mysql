const pool = require("../DB");

//Controler for creating new Model
exports.createModel = (req, res) => {
    if (!req.body.model_name) res.status(400).json({ message: "Please provide a valid data for new Model" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        pool.query("INSERT INTO `MODEL` (`MAKER_ID`, `MODEL_NAME`) VALUES (?, ?)", [req.body.maker_id, req.body.model_name], (error) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            }
            else {
                res.status(201).json({ message: `Model ${req.body.model_name} is successfully added.` });
            }
        });
        connection.release();
    });

}

//Controler for geting all Models
exports.getAllModels = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        pool.query("select * from `MODEL`", (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: `No Models found.` })
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for geting one Model
exports.getOneModel = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        pool.query("select * from `MODEL` where `MODEL_ID` = ?", [req.params.model_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: "Model is not found." });
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for updating one Model
exports.updateOneModel = (req, res) => {
    if (!req.body.model_name, !req.body.model_id) return res.status(400).json({ message: "Please provide a valid data for updating Model" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        pool.query("UPDATE `MODEL` SET `MODEL_NAME` = ? WHERE `MODEL`.`MODEL_ID` = ?", [req.body.model_name, req.body.model_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Model not found." });
                } else {
                    res.status(201).json({ message: `Model with id=${req.body.model_id} successfully updated to ${req.body.model_name}.` });
                }
            }
        });
        connection.release();
    });
}

//Controler for deleting one Model
exports.deleteOneModel = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });
        pool.query("DELETE FROM `MODEL` WHERE `MODEL`.`MODEL_ID` = ?", [req.body.model_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json("Model is not found.");
                } else {
                    res.status(200).json(`Model with id: ${req.body.model_id} is successfully deleted.`);
                }
            }
        });
        connection.release();
    });
}