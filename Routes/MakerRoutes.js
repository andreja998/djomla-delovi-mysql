const express = require("express");
const router = express.Router();

const makerControler = require("../Controllers/MakerController");

router.post("/", makerControler.createMaker);
router.get("/", makerControler.getAllMakers);
router.get("/:maker_id", makerControler.getOneMaker);
router.put("/", makerControler.updateOneMaker);
router.post("/remove", makerControler.deleteOneMaker);

module.exports = router;
