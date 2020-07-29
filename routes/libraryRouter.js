const express = require("express");
const libraryController = require("../controllers/libraryController.js");
const libraryRouter = express.Router();
const fileUploadUtil = require('../util/fileUploadUtil');

libraryRouter.get("/", libraryController.index);
libraryRouter.post("/addCategory", libraryController.addCategory);
libraryRouter.post("/addSubcategory/:id", libraryController.addSubcategory);
libraryRouter.post("/addSubcategoryDoc/:SubcategoryId", fileUploadUtil.multerMw("./public/files/uploads").single('file'), libraryController.addSubcategoryDoc);
libraryRouter.post("/addCategoryDoc/:CategoryId", fileUploadUtil.multerMw("./public/files/uploads").single('file'), libraryController.addCategoryDoc);

module.exports = libraryRouter;
