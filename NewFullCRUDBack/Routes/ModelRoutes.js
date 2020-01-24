const express = require("express");
const router = express.Router();

const modelControler = require("../Controllers/ModelController");

router.post("/", modelControler.createModel);
router.post("/getAllModels", modelControler.getAllModels);
router.get("/:model_id", modelControler.getOneModel);
router.put("/", modelControler.updateOneModel);
router.post("/remove", modelControler.deleteOneModel);

module.exports = router;
