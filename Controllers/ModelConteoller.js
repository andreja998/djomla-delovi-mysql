const ModelOfModel = require('../Models/ModelModel');

exports.createModel = function (req, res) {
    const newModel = new ModelOfModel(req.body);

    //handles null error 
    if (!newModel.model_name) {
        console.log(req.params);
        res.status(400).send({ error: true, message: 'Please provide valid info about Model' });
    }
    else {
        ModelOfModel.createModel(newModel, function (err, maker) {
            if (err)
                res.send(err);
            res.json({ message: `Added new Model: ${newModel.model_name}` });
        });
    }
};

exports.returnAllModels = function (req, res) {
    ModelOfModel.getAllModels(function (err, model) {
        if (err)
            res.send(err);
        res.send(model);
    });
};

exports.returnOneModel = function (req, res) {
    ModelOfModel.getOneModel(req.params.model_id, function (err, model) {
        if (err)
            res.send(err);
        res.json(model);
    });
};

exports.updateOneModel = function (req, res) {
    ModelOfModel.updateModelById(req.params.model_id, new ModelOfModel(req.body), function (err, model) {
        if (err)
            res.send(err);
        res.json({ message: model.message });
    });
};


exports.deleteOneModel = function (req, res) {
    ModelOfModel.removeOneModel(req.params.model_id, function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Model successfully deleted' });
    });
}; 