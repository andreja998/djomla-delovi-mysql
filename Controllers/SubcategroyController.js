const pool = require("../DB");

//Controler for creating new Subcategory
exports.createSubcategory = (req, res) => {
    if (!req.body.subcategory_name) {
        res.status(400).send({ error: true, message: "Please provide a valid info about Subcategory" });
    } else {
        pool.query("INSERT INTO `SUBCATEGORY` (`SUBCATEGORY_NAME`) VALUES (?)", [req.body.subcategory_name], (err) => {
            if (err) {
                res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
            }
            else {
                res.status(201).send(`Subcategory ${req.body.subcategory_name} is successfully added.`);
            }
        });
    }
}

//Controler for geting all Subcategories
exports.getAllSubcategories = (req, res) => {
    pool.query("select * from `SUBCATEGORY`", (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send(`No Subcategories found.`)
            } else {
                res.status(200).json(result);
            }
        }
    });
}

//Controler for geting one Subcategory
exports.getOneSubcategory = (req, res) => {
    pool.query("select * from `SUBCATEGORY` where `SUBCATEGORY_ID` = ?", [req.params.subcategory_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send("Subcategory is not found.");
            } else {
                res.status(200).json(result);
            }
        }
    });
}

//Controler for updating one Subcategory
exports.updateOneSubcategory = (req, res) => {
    pool.query("UPDATE `SUBCATEGORY` SET `SUBCATEGORY_NAME` = ? WHERE `SUBCATEGORY`.`SUBCATEGORY_ID` = ?", [req.body.subcategory_name, req.body.subcategory_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Subcategory is not found.");
            } else {
                res.status(201).send(`Subcategory is successfully updatet to ${req.body.subcategory_name}.\n` + result.message);
            }
        }
    });
}

//Controler for deleting one Subcategory
exports.deleteOneSubcategory = (req, res) => {
    pool.query("DELETE FROM `SUBCATEGORY` WHERE `SUBCATEGORY`.`SUBCATEGORY_ID` = ?", [req.body.subcategory_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err, result}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Subcategory is not found.");
            } else {
                res.status(200).send(`Subcategory with id: ${req.body.subcategory_id} is successfully deleted.`);
            }
        }
    });
}