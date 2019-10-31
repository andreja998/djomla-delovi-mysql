module.exports = function (app) {
    var makerCntrl = require('../Controllers/MakerController');
    var modelCntrl = require('../Controllers/ModelConteoller');

    // makerCntrl Routes
    app.route('/maker')
        .get(makerCntrl.returnAllMakers)
        .post(makerCntrl.createMaker);

    app.route('/maker/:maker_id')
        .get(makerCntrl.returnOneMaker)
        .put(makerCntrl.updateOneMaker)
        .delete(makerCntrl.deleteOneMaker);


    // modelCntrl Routes
    app.route('/model')
        .get(modelCntrl.returnAllModels)
        .post(modelCntrl.createModel);

    app.route('/model/:model_id')
        .get(modelCntrl.returnOneModel)
        .put(modelCntrl.updateOneModel)
        .delete(modelCntrl.deleteOneModel);
};