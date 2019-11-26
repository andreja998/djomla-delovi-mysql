const pool = require("../DB");

//Controler for creating new Subcategory
exports.createSubcategory = (req, res) => {
    if (!req.body.subcategory_name) return res.status(400).json({ message: "Please provide a valid data for new Subcategory" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("INSERT INTO `SUBCATEGORY` (`SUBCATEGORY_NAME`) VALUES (?)", [req.body.subcategory_name], (error) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            }
            else {
                res.status(201).json({ message: `Subcategory ${req.body.subcategory_name} is successfully added.` });
            }
        });
        connection.release();
    });
}

//Controler for geting all Subcategories
exports.getAllSubcategories = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("select * from `SUBCATEGORY`", (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: "Subcategories not found." });
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for geting one Subcategory
exports.getOneSubcategory = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("select * from `SUBCATEGORY` where `SUBCATEGORY_ID` = ?", [req.params.subcategory_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: "Subcategory not found." });
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for updating one Subcategory
exports.updateOneSubcategory = (req, res) => {
    if (!req.body.subcategory_name, !req.body.subcategory_id) return res.status(400).json({ message: "Please provide a valid data for updating Subcategory" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("UPDATE `SUBCATEGORY` SET `SUBCATEGORY_NAME` = ? WHERE `SUBCATEGORY`.`SUBCATEGORY_ID` = ?", [req.body.subcategory_name, req.body.subcategory_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Subcategory is not found." });
                } else {
                    res.status(200).json({ message: `Subcategory with id=${req.body.subcategory_id} is successfully updatet to ${req.body.subcategory_name}.\n` });
                }
            }
        });
        connection.release();
    });
}

//Controler for deleting one Subcategory
exports.deleteOneSubcategory = (req, res) => {
    if (!req.body.subcategory_id) return res.status(400).json({ message: "Please provide a valid subcategory ID" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("DELETE FROM `SUBCATEGORY` WHERE `SUBCATEGORY`.`SUBCATEGORY_ID` = ?", [req.body.subcategory_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Subcategory is not found." });
                } else {
                    res.status(200).json({ message: `Subcategory with id: ${req.body.subcategory_id} is successfully deleted.` });
                }
            }
        });
        connection.release();
    });
}