const express = require('express');
const router = express.Router();

const partControler = require('../Controllers/PartController');


router.post('/', partControler.createPart);
router.get('/', partControler.getAllParts);
router.get('/:part_id', partControler.getOnePart);
router.put('/', partControler.updateOnePart);
router.delete('/', partControler.deleteOnePart);

module.exports = router;