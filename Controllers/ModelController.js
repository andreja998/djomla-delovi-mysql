const pool = require("../DB");

//Controler for creating new Model
exports.createModel = (req, res) => {
    if (!req.body.model_name) {
        res.status(400).send({ error: true, message: "Please provide a valid info about model" });
    } else {
        pool.query("INSERT INTO `MODEL` (`MAKER_ID`, `MODEL_NAME`) VALUES (?, ?)", [req.body.maker_id, req.body.model_name], (err) => {
            if (err) {
                res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
            }
            else {
                res.status(201).send(`Model ${req.body.model_name} is successfully added.`);
            }
        });
    }
}

//Controler for geting all Models
exports.getAllModels = (req, res) => {
    pool.query("select * from `MODEL`", (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send(`No Models found.`)
            } else {
                res.status(200).json(result);
            }
        }
    });
}

//Controler for geting one Model
exports.getOneModel = (req, res) => {
    pool.query("select * from `MODEL` where `MODEL_ID` = ?", [req.params.model_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send("Model is not found.");
            } else {
                res.status(200).json(result);
            }
        }
    });
}

//Controler for updating one Model
exports.updateOneModel = (req, res) => {
    pool.query("UPDATE `MODEL` SET `MODEL_NAME` = ? WHERE `MODEL`.`MODEL_ID` = ?", [req.body.model_name, req.body.model_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Model is not found.");
            } else {
                res.status(201).send(`Model is successfully updatet to ${req.body.model_id}.\n` + result.message);
            }
        }
    });
}

//Controler for deleting one Model
exports.deleteOneModel = (req, res) => {
    pool.query("DELETE FROM `MODEL` WHERE `MODEL`.`MODEL_ID` = ?", [req.body.model_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Model is not found.");
            } else {
                res.status(200).send(`Model with id: ${req.body.model_id} is successfully deleted.`);
            }
        }
    });
}