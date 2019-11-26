const express = require('express');
const router = express.Router();

const otherControler = require('../Controllers/OtherControllers');


router.post('/', otherControler.getParts);

module.exports = router;