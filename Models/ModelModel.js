const mysqlConn = require('../db');

const Model = function (model) {
    this.model_id = model.model_id;
    this.model_name = model.model_name;
};

Model.createModel = function (newModel, result) {
    mysqlConn.query('insert into djomla.MODEL set ?', [newModel], function (err, res) {
        if (err) {
            console.log('error:  ' + err);
            result(err, null);
        } else {
            result(null, res.maker_id);
        }
    });
}

Model.getOneModel = function (model_id, result) {
    mysqlConn.query("select * from MODEL where model_id = ? ", [model_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Model.getAllModels = function (result) {
    mysqlConn.query("Select * from djomla.MODEL", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Model.updateModelById = function (model_id, model_name, result) {
    mysqlConn.query("UPDATE MODEL SET model_name = ? WHERE model_id = ?", [model_name, model_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Model.removeOneModel = function (model_id, result) {
    mysqlConn.query("DELETE FROM MODEL WHERE model_id = ?", [model_id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Model;

