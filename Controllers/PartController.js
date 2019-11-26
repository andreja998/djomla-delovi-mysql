const pool = require("../DB");

//Controler for creating new Part
exports.createPart = (req, res) => {
    if (!req.body.part_name, !req.body.part_price, !req.body.part_desc, !req.body.category_id, !req.body.subcategory_id, !req.body.model_id) res.status(400).json({ error: "Please provide a valid data for this fucking complicated query!!!!! :O :O :O" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.beginTransaction((error) => {
            if (error) res.status(500).json({ message: `Error while starting transaction:\n--->`, error: error });

            let lastInsertedId;
            let c_sc_id;
            let greske = '';

            connection.query("INSERT INTO `PART` (`PART_NAME`, `PART_PRICE`, `PART_DESC`) VALUES (?, ?, ?)", [req.body.part_name, req.body.part_price, req.body.part_desc], (error, result) => {
                if (error) {
                    return connection.rollback(() => {
                        greske += { message: `Error while inserting into PART:\n--->`, error: error };
                        return res.status(500).json(greske);
                    });
                }

                lastInsertedId = result.insertId;

                connection.query("SELECT `CATEGORY_SUBCATEGORY_ID` FROM `CATEGORY_SUBCATEGORY` WHERE `CATEGORY_ID` = ? AND `SUBCATEGORY_ID` = ?", [req.body.category_id, req.body.subcategory_id], (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            greske += { message: `Error while reading from CATEGORY_SUBCATEGORY_ID:\n--->`, error: error };
                            return res.status(500).json(greske);
                        });
                    }

                    try {
                        c_sc_id = result[0]['CATEGORY_SUBCATEGORY_ID'];
                        throw `Doslo je do greske pri dodeljivanju vrednosti promenljivoj c_sc_id`;
                    } catch (error) {
                        greske += { message: `Error while initializing variable c_sc_id:\n--->`, error: error };
                    }

                    connection.query("INSERT INTO `PART_CATEGORY_SUBCATEGORY` (`CATEGORY_SUBCATEGORY_ID`, `PART_ID`, `MODEL_ID`) VALUES (?, ?, ?)", [c_sc_id, lastInsertedId, req.body.model_id], (error) => {
                        if (error) {
                            return connection.rollback(() => {
                                greske += { message: `Error while inserting into PART_CATEGORY_SUBCATEGORY:\n--->`, error: error };
                                return res.status(500).json(greske);
                            });
                        }

                        connection.commit(function (error) {
                            if (error) {
                                return connection.rollback(() => {
                                    return res.status(500).json(greske);
                                });
                            }
                            res.status(200).json({ message: "Successfully added new Part" });
                        });
                    });
                });
            });
        });
    });
}

//Controler for geting all Parts
exports.getAllParts = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("select * from `PART`", (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json({ message: `No Parts found.` });
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for geting one Part
exports.getOnePart = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("select * from `PART` where `PART_ID` = ?", [req.params.part_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(200).json("Part is not found.");
                } else {
                    res.status(200).json(result);
                }
            }
        });
        connection.release();
    });
}

//Controler for updating one Part
exports.updateOnePart = (req, res) => {
    if (!req.body.part_name, !req.body.part_price, !req.body.part_desc, !req.body.part_id) return res.status(400).json({ message: "Please provide a valid data for updating Part" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("UPDATE `PART` SET `PART_NAME` = ?, `PART_PRICE` = ?, `PART_DESC` = ? WHERE `PART`.`PART_ID` = ?; ", [req.body.part_name, req.body.part_price, req.body.part_desc, req.body.part_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Part is not found." });
                } else {
                    res.status(201).json({ message: `Part is successfully updatet to ${req.body.part_name}.\n` + result.message });
                }
            }
        });
        connection.release();
    });
}

//Controler for deleting one Part
exports.deleteOnePart = (req, res) => {
    if (!req.body.part_id) return res.status(400).json({ message: "Please provide a valid part ID" });

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        connection.query("DELETE FROM `PART` WHERE `PART`.`PART_ID` = ?", [req.body.part_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.affectedRows == 0) {
                    res.status(200).json({ message: "Part is not found." });
                } else {
                    res.status(200).json({ message: `Part with id: ${req.body.part_id} is successfully deleted.` });
                }
            }
        });
        connection.release();
    });
}