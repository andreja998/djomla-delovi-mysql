const MakerModel = require('../Models/MakerModel');

exports.createMaker = function (req, res) {
    var newModel = new MakerModel(req.body);

    //handles null error 
    if (!newModel.maker_name) {
        res.status(400).send({ error: true, message: 'Please provide valid info about Maker' });
    }
    else {
        MakerModel.createMaker(newModel, function (err, maker) {
            if (err)
                res.send(err);
            res.json({message: `Added new Maker: ${newModel.maker_name}`});
        });
    }
};

exports.returnAllMakers = function (req, res) {
    MakerModel.getAllMakers(function (err, maker) {
        // console.log('controller')
        if (err)
            res.send(err);
        // console.log('res', task);
        res.send(maker);
    });
};

exports.returnOneMaker = function (req, res) {
    MakerModel.getOneMaker(req.params.maker_id, function (err, maker) {
        if (err)
            res.send(err);
        res.json(maker);
    });
};

exports.updateOneMaker = function (req, res) {
    MakerModel.updateById(req.params.maker_id, new MakerModel(req.body), function (err, maker) {
        if (err)
            res.send(err);
        res.json({message: maker.message});
    });
};


exports.deleteOneMaker = function (req, res) {


    MakerModel.removeOneMaker(req.params.maker_id, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Maker successfully deleted' });
    });
};