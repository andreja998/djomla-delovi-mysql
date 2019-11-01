const express = require('express');
const router = express.Router();

const categoryControler = require('../Controllers/CategoryController');


router.post('/', categoryControler.createCategory);
router.get('/', categoryControler.getAllCategories);
router.get('/:category_id', categoryControler.getOneCategory);
router.put('/', categoryControler.updateOneCategory);
router.delete('/', categoryControler.deleteOneCategory);

module.exports = router;