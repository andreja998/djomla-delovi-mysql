const express = require('express');
const router = express.Router();

const otherControler = require('../Controllers/OtherControllers');


router.post('/getAllPArts', otherControler.getParts);
router.post('/getOnePart', otherControler.getPartEverything);

module.exports = router;