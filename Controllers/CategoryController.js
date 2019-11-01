const pool = require("../DB");

//Controler for creating new Category
exports.createCategory = (req, res) => {
    if (!req.body.category_name) {
        res.status(400).send({ error: true, message: "Please provide a valid info about Category" });
    } else {
        pool.query("INSERT INTO `CATEGORY` (`CATEGORY_NAME`) VALUES (?)", [req.body.category_name], (err) => {
            if (err) {
                res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
            }
            else {
                res.status(201).send(`Category ${req.body.category_name} is successfully added.`);
            }
        });
    }
}

//Controler for geting all Category
exports.getAllCategories = (req, res) => {
    pool.query("select * from `CATEGORY`", (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send(`No Categoris found.`)
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for geting one Category
exports.getOneCategory = (req, res) => {
    pool.query("select * from `CATEGORY` where `CATEGORY_ID` = ?", [req.params.category_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send("Category is not found.");
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for updating one Category
exports.updateOneCategory = (req, res) => {
    pool.query("UPDATE `CATEGORY` SET `CATEGORY_NAME` = ? WHERE `CATEGORY`.`CATEGORY_ID` = ?", [req.body.category_name, req.body.category_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Category is not found.");
            } else {
                res.status(201).send(`Category is successfully updatet to ${req.body.category_name}.\n` + result.message);
            }
        }
    });
}

//Controler for deleting one Maker
exports.deleteOneCategory = (req, res) => {
    pool.query("DELETE FROM `CATEGORY` WHERE `CATEGORY`.`CATEGORY_ID` = ?", [req.body.category_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err, result}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Category is not found.");
            } else {
                res.status(200).send(`Category with id: ${req.body.category_id} is successfully deleted.`);
            }
        }
    });
}