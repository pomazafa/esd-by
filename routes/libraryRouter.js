const express = require("express");
const libraryController = require("../controllers/libraryController.js");
const libraryRouter = express.Router();

libraryRouter.get("/", libraryController.index);
libraryRouter.get("/addCategory", libraryController.addCategory);
libraryRouter.get("/addSubategory/:id", libraryController.addSubcategory);

module.exports = libraryRouter;
