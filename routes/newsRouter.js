const express = require("express");
const newsController = require("../controllers/newsController.js");
const newsRouter = express.Router();

newsRouter.get("/", newsController.index);
newsRouter.get("/add/", newsController.addget);
newsRouter.post("/add", newsController.addpost);
newsRouter.get("/delete/:id", newsController.delete);
newsRouter.get("/:id/", newsController.getNew);

module.exports = newsRouter;
