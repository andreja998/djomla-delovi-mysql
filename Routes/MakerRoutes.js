// module.exports = function (app) {
//     const makerCntrl = require('../Controllers/MakerController');
//     app.route('/maker')
//         .get(makerCntrl.listAllMakers)
//         .post(makerCntrl.createMaker);

//     app.route('/maker/:makerId')
//         .get(makerCntrl.listOneMaker)
//         .put(makerCntrl.updateOneMaker)
//         .delete(makerCntrl.deleteOneMaker);
// };

module.exports = function (app) {
    var makerCntrl = require('../Controllers/MakerController');

    // makerCntrl Routes
    app.route('/maker')
        .get(makerCntrl.returnAllMakers)
        .post(makerCntrl.createMaker);

    app.route('/maker/:maker_id')
        .get(makerCntrl.returnOneMaker)
        .put(makerCntrl.updateOneMaker)
        .delete(makerCntrl.deleteOneMaker);
};