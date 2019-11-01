const pool = require("../DB");

//Controler for creating new Part
exports.createPart = (req, res) => {
    if (!req.body.part_name) {
        res.status(400).send({ error: true, message: "Please provide a valid info about part" });
    } else {
        pool.query("INSERT INTO `PART` (`PART_ID`, `PART_NAME`) VALUES (?, ?)", [req.body.part_id, req.body.part_name], (err) => {
            if (err) {
                res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
            }
            else {
                res.status(201).send(`Part ${req.body.part_name} is successfully added.`);
            }
        });
    }
}

//Controler for geting all Parts
exports.getAllParts = (req, res) => {
    pool.query("select * from `PART`", (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send(`No Parts found.`)
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for geting one Part
exports.getOnePart = (req, res) => {
    pool.query("select * from `PART` where `PART_ID` = ?", [req.params.part_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.length <= 0) {
                res.status(404).send("Part is not found.");
            } else {
                res.status(200).send(result);
            }
        }
    });
}

//Controler for updating one Part
exports.updateOnePart = (req, res) => {
    pool.query("UPDATE `PART` SET `PART_NAME` = ? WHERE `PART`.`PART_ID` = ?", [req.body.part_name, req.body.part_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Part is not found.");
            } else {
                res.status(201).send(`Part is successfully updatet to ${req.body.part_name}.\n` + result.message);
            }
        }
    });
}

//Controler for deleting one Part
exports.deleteOnePart = (req, res) => {
    pool.query("DELETE FROM `PART` WHERE `PART`.`PART_ID` = ?", [req.body.part_id], (err, result) => {
        if (err) {
            res.status(500).send(`Something went wrong with our app or servers:\n   ---> ${err}`);
        } else {
            if (result.affectedRows == 0) {
                res.status(404).send("Part is not found.");
            } else {
                res.status(200).send(`Part with id: ${req.body.part_id} is successfully deleted.`);
            }
        }
    });
}