const pool = require('../DB');

exports.getParts = (req, res) => {
    if (!req.body.model_id, !req.body.maker_id, !req.body.category_id, !req.body.subcategory_id) return res.status(400).json({ message: "Please provide a valid data" })

    pool.getConnection((error, connection) => {
        if (error) res.status(500).json({ message: `Error while getting new connection from pool:\n--->`, error: error });

        let option = req.body.option;
        let sqlQuery = '';

        switch (option) {
            case 1:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCAATEGORY` AS PCS LEFT JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = 1 JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = 1 LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID LEFT JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
                break;
            case 2:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCAATEGORY` AS PCS LEFT JOIN `PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = 1 JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = 1 LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID AND CS.CATEGORY_ID = 1 LEFT JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
                break;
            case 3:
                sqlQuery = "SELECT P.PART_ID, P.`PART_NAME`, P.`PART_PRICE`, P.`PART_DESC`, M.MODEL_NAME, MK.MAKER_NAME, C.CATEGORY_NAME, SC.SUBCATEGORY_NAME FROM `PART_CATEGORY_SUBCAATEGORY` AS PCS LEFT JOIN`PART` AS P ON PCS.PART_ID = P.PART_ID JOIN `MODEL` AS M ON PCS.MODEL_ID = M.MODEL_ID AND M.MODEL_ID = ? JOIN `MAKER` AS MK ON M.MAKER_ID = MK.MAKER_ID AND MK.MAKER_ID = ? LEFT JOIN `CATEGORY_SUBCATEGORY` AS CS ON PCS.CATEGORY_SUBCATEGORY_ID = CS.CATEGORY_SUBCATEGORY_ID AND CS.CATEGORY_ID = 1 AND CS.SUBCATEGORY_ID = 1 JOIN `CATEGORY` AS C ON CS.CATEGORY_ID = C.CATEGORY_ID AND C.CATEGORY_ID = ? LEFT JOIN `SUBCATEGORY` AS SC ON CS.SUBCATEGORY_ID = SC.SUBCATEGORY_ID";
        }


        connection.query(sqlQuery, [req.body.model_id, req.body.maker_id, req.body.category_id, req.body.subcategory_id], (error, result) => {
            if (error) {
                res.status(500).json({ message: `Something went wrong with our app or servers:\n--->`, error: error });
            } else {
                if (result.length <= 0) {
                    res.status(404).json({ message: 'No parts found' });
                } else {
                    res.status(200).json(result);
                }
            }
        });

        connection.release();
    });
}