const pool = require("../DB");

//Controler for creating new Subcategory
exports.createSubcategory = (req, res) => {
    if (!req.body.subcategory_name) return res.status(400).json({ message: "Please provide a valid data for new Subcategory" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.beginTransaction((error) => {
            if (error) res.status(500).json({ message: `Error while starting transaction:\n--->`, error: error });

            let greske = { message: String, error: String };
            let lastInsertId;
            let categoryID = req.body.category_id;

            connection.query("INSERT INTO `SUBCATEGORY` (`SUBCATEGORY_NAME`) VALUES (?)", [req.body.subcategory_name], (error, result) => {
                if (error) {
                    return connection.rollback(() => {
                        greske = { message: `Error while inserting into SUBCATEGORY:\n--->`, error: error };
                        return res.status(500).json(greske);
                    });
                }

                lastInsertId = result.insertId;

                connection.query("INSERT INTO `CATEGORY_SUBCATEGORY` (`CATEGORY_ID`, `SUBCATEGORY_ID`) VALUES (?, ?)", [categoryID, lastInsertId], (error) => {
                    if (error) {
                        return connection.rollback(() => {
                            greske = { message: `Error while inserting into CATEGORY_SUBCATEGORY:\n--->`, error: error };
                            return res.status(500).json(greske);
                        });
                    }

                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                greske = { message: `Error while commiting:\n--->`, error: error };
                                return res.status(500).json(greske);
                            });
                        }
                        connection.release();
                        res.status(200).json({ message: "Successfully added new Subcategroy" });
                    });
                });

            });
        });
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