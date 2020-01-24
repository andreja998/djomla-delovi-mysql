const express = require("express");
const router = express.Router();

const imageController = require("../Controllers/ImageController");

router.post("/getPhotos", imageController.getPhotos);
router.post("/deleteImages", imageController.deletePhotos);
router.post("/uploadImages", imageController.multipleUpload);

module.exports = router;
