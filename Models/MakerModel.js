const mysqlConn = require('../db');

const Maker = function (maker) {
    this.maker_id = maker.maker_id;
    this.maker_name = maker.maker_name;
};

Maker.createMaker = function (newMaker, result) {
    mysqlConn.query('insert into djomla.MAKER set ?', [newMaker], function (err, res) {
        if (err) {
            console.log('error:  ' + err);
            result(err, null);
        } else {
            // console.log(res.maker_id);
            result(null, res.maker_id);
        }
    });
}

Maker.getOneMaker = function (maker_id, result) {
    mysqlConn.query("select * from MAKER where maker_id = ? ", [maker_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Maker.getAllMakers = function (result) {
    mysqlConn.query("Select * from djomla.MAKER", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            // console.log('tasks : ', res);
            result(null, res);
        }
    });
};

Maker.updateMakerById = function (maker_id, maker_name, result) {
    mysqlConn.query("UPDATE MAKER SET maker_name = ? WHERE MAKER.maker_id = ?", [maker_name, maker_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Maker.removeOneMaker = function (maker_id, result) {
    mysqlConn.query("DELETE FROM MAKER WHERE maker_id = ?", [maker_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Maker;

