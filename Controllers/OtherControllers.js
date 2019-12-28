const pool = require('../DB');

exports.getParts = (req, res) => {
    // if (!req.body.model_id, !req.body.maker_id, !req.body.category_id, !req.body.subcategory_id, !req.body.option, !req.body.from) return res.status(400).json({ message: "Please provide a valid data" })

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        let option = req.body.option;
        let sqlQuery = '';

        switch (option) {
            case 1:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCATEGORY` AS PCS LEFT JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = ? JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = ? LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID LEFT JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
                break;
            case 2:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCATEGORY` AS PCS LEFT JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = ? JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = ? LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID AND CS.CATEGORY_ID = ? LEFT JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
                break;
            case 3:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCATEGORY` AS PCS LEFT JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = ? JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = ? LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID AND CS.CATEGORY_ID = ? AND CS.SUBCATEGORY_ID = ? JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID AND C.CATEGORY_ID = ? LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
        }

        connection.query(sqlQuery, [req.body.model_id, req.body.maker_id, req.body.category_id, req.body.subcategory_id, req.body.category_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(404).json({ message: 'No parts found' });
                } else {
                    res.status(200).json(result);
                }
            }
            connection.release();
        });
    });
}

exports.getPartEverything = (req, res) => {
    if (!req.body.part_id) return res.status(400).json({ message: "Please provide a valid data" })

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool`, error: error });

        let sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCATEGORY` AS PCS JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID and P.PART_ID = ? JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID  JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID  JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";

        connection.query(sqlQuery, [req.body.part_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(404).json({ message: 'No parts found' });
                } else {
                    res.status(200).json(result);
                }
            }
            connection.release();
        });
    });
}