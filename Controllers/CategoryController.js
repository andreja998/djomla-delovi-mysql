const pool = require("../DB");

//Controler for creating new Category
exports.createCategory = (req, res) => {
    if (!req.body.category_name) return res.status(400).json({ message: "Please provide a valid data for new Category" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query("INSERT INTO `CATEGORY` (`CATEGORY_NAME`) VALUES (?)", [req.body.category_name], (error) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            }
            else {
                let lastInsertedId_category = result.insertId;
                res.status(201).json({ message: `Category ${req.body.category_name} is successfully added.`, category_id: lastInsertedId_category });
            }
            connection.release();
        });
    });
}

//Controler for geting all Category
exports.getAllCategories = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query("select * from `CATEGORY`", (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: `No Categoris found.` })
                } else {
                    res.status(200).json(result);
                }
            }
            connection.release();
        });
    });
}

//Controler for geting one Category
exports.getOneCategory = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query("select * from `CATEGORY` where `CATEGORY_ID` = ?", [req.params.category_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: "Category not found." });
                } else {
                    res.status(200).json(result);
                }
            }
            connection.release();
        });
    });
}

//Controler for updating one Category
exports.updateOneCategory = (req, res) => {
    if (!req.body.category_id, !req.body.category_name) return res.status(400).json({ message: "Please provide a valid info about Category" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query("UPDATE `CATEGORY` SET `CATEGORY_NAME` = ? WHERE `CATEGORY`.`CATEGORY_ID` = ?", [req.body.category_name, req.body.category_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Category is not found." });
                } else {
                    res.status(201).json({ message: `Category with id=${req.body.category_id} is successfully updatet to ${req.body.category_name}.` });
                }
            }
            connection.release();
        });
    });
}

//Controler for deleting one Maker
exports.deleteOneCategory = (req, res) => {
    if (!req.body.category_id) return res.status(400).json({ message: "Please provide a valid categroy ID" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        connection.query("DELETE FROM `CATEGORY` WHERE `CATEGORY`.`CATEGORY_ID` = ?", [req.body.category_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Category is not found." });
                } else {
                    res.status(200).json({ message: `Category with id: ${req.body.category_id} is successfully deleted.` });
                }
            }
            connection.release();
        });
    });
}