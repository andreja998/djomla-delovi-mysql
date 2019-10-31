const ModelOfMaker = require('../Models/MakerModel');

exports.createMaker = function (req, res) {
    var newMaker = new ModelOfMaker(req.body);

    //handles null error 
    if (!newMaker.maker_name) {
        res.status(400).send({ error: true, message: 'Please provide valid info about Maker' });
    }
    else {
        ModelOfMaker.createMaker(newMaker, function (err, maker) {
            if (err)
                res.send(err);
            res.json({ message: `Added new Maker: ${newMaker.maker_name}` });
        });
    }
};

exports.returnAllMakers = function (req, res) {
    ModelOfMaker.getAllMakers(function (err, maker) {
        // console.log('controller')
        if (err)
            res.send(err);
        // console.log('res', task);
        res.send(maker);
    });
};

exports.returnOneMaker = function (req, res) {
    ModelOfMaker.getOneMaker(req.params.maker_id, function (err, maker) {
        if (err)
            res.send(err);
        res.json(maker);
    });
};

exports.updateOneMaker = function (req, res) {
    ModelOfMaker.updateMakerById(req.params.maker_id, new ModelOfMaker(req.body), function (err, maker) {
        if (err)
            res.send(err);
        res.json({ message: maker.message });
    });
};


exports.deleteOneMaker = function (req, res) {


    ModelOfMaker.removeOneMaker(req.params.maker_id, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Maker successfully deleted' });
    });
};