const express = require("express");
const newsController = require("../controllers/newsController.js");
const newsRouter = express.Router();
const fileUploadUtil = require('../util/fileUploadUtil');

newsRouter.get("/", newsController.index);
newsRouter.get("/add/", newsController.addget);
newsRouter.post("/add", fileUploadUtil.multerMw("./public/images/uploads").single('photo'), newsController.addpost);
newsRouter.get("/delete/:id", newsController.delete);
newsRouter.get("/:id/", newsController.getNew);

module.exports = newsRouter;
