const express = require("express");
const router = express.Router();

const subcategoryControler = require("../Controllers/SubcategroyController");

router.post("/", subcategoryControler.createSubcategory);
router.post("/getAllSubcategories", subcategoryControler.getAllSubcategories);
router.get("/:subcategory_id", subcategoryControler.getOneSubcategory);
router.put("/", subcategoryControler.updateOneSubcategory);
router.post("/remove", subcategoryControler.deleteOneSubcategory); // POST, remove

module.exports = router;
