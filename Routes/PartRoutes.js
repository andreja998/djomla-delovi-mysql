const express = require('express');
const router = express.Router();

const partControler = require('../Controllers/PartController');


router.post('/', partControler.createPart);
router.post('/uploadImages', partControler.multipleUpload);
router.get('/', partControler.getAllParts);
router.get('/form', partControler.home); //Ruta za testiranje unosa slika
router.get('/id/:part_id', partControler.getOnePartByID);
router.get('/name/:part_name', partControler.getOnePartByName);
router.put('/', partControler.updateOnePart);
router.delete('/', partControler.deleteOnePart);

module.exports = router;