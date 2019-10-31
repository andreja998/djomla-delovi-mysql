const express = require('express');
const router = express.Router();

const makerControler = require('../Controllers/MakerControler');


router.post('/', makerControler.createMaker);
router.get('/', makerControler.getAllMakers);
router.get('/:maker_id', makerControler.getOneMaker);
router.put('/:maker_id', makerControler.updateOneMaker)

module.exports = router;