const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/:lang", homeController.index);
homeRouter.get("/", homeController.index);
homeRouter.get("/about/:lang", homeController.about);

module.exports = homeRouter;
