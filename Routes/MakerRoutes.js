const express = require('express');
const router = express.Router();

const makerControler = require('../Controllers/MakerControler');


router.post('/', makerControler.createMaker);
router.get('/', makerControler.getAllMakers);
router.get('/:maker_id', makerControler.getOneMaker);
router.put('/', makerControler.updateOneMaker);
router.delete('/', makerControler.deleteOneMaker);

module.exports = router;