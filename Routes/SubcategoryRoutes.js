const express = require('express');
const router = express.Router();

const subcategoryControler = require('../Controllers/SubcategroyController');


router.post('/', subcategoryControler.createSubcategory);
router.get('/', subcategoryControler.getAllSubcategories);
router.get('/:subcategory_id', subcategoryControler.getOneSubcategory);
router.put('/', subcategoryControler.updateOneSubcategory);
router.delete('/', subcategoryControler.deleteOneSubcategory);

module.exports = router;