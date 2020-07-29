const express = require("express");
const libraryController = require("../controllers/libraryController.js");
const libraryRouter = express.Router();

libraryRouter.get("/", libraryController.index);
libraryRouter.post("/addCategory", libraryController.addCategory);
libraryRouter.post("/addSubcategory/:id", libraryController.addSubcategory);
libraryRouter.post("/addSubcategoryDoc/:CategoryId/:SubcategoryId", libraryController.addSubcategoryDoc);
libraryRouter.post("/addCategoryDoc/:CategoryId", libraryController.addCategoryDoc);

module.exports = libraryRouter;
