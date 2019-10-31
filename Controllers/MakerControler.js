const pool = require("../DB");

//Controler for creating new Maker
exports.createMaker = (req, res) => {
    if (!req.body.maker_name) {
        res.status(400).send({ error: true, message: "Please provide a valid info about maker" });
    } else {
        pool.query("INSERT INTO `MAKER` (`MAKER_NAME`) VALUES (?)", [req.body.maker_name], (err) => {
            if (err) {
                res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
            }
            else {
                res.status(201).send(`Maker ${req.body.maker_name} is successfully added.`);
            }
        });
    }
}

//Controler for geting all Makers
exports.getAllMakers = (req, res) => {
    pool.query("select * from `MAKER`", (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send(`No Makers found.`)
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for geting one Maker
exports.getOneMaker = (req, res) => {
    pool.query("select * from `MAKER` where `MAKER_ID` = ?", [req.params.maker_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send("Maker is not found.");
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for updating one Maker
exports.updateOneMaker = (req, res) => {
    pool.query("UPDATE `MAKER` SET `MAKER_NAME` = ? WHERE `MAKER`.`MAKER_ID` = ?", [req.body.maker_name, req.body.maker_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Maker is not found.");
            } else {
                res.status(201).send(`Maker is successfully updatet to ${req.body.maker_name}.\n` + result.message);
            }
        }
    });
}

//Controler for deleting one Maker
exports.deleteOneMaker = (req, res) => {
    pool.query("DELETE FROM `MAKER` WHERE `MAKER`.`MAKER_ID` = ?", [req.body.maker_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err, result}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Model is not found.");
            } else {
                res.status(200).send(`Maker with id: ${req.body.maker_id} is successfully deleted.`);
            }
        }
    });
}