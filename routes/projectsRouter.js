const express = require("express");
const projectsController = require("../controllers/projectsController.js");
const projectsRouter = express.Router();
const fileUploadUtil = require('../util/fileUploadUtil');

projectsRouter.get("/", projectsController.index);
projectsRouter.get("/add/", projectsController.addget);
projectsRouter.post("/add", fileUploadUtil.multerMw.single('photo'), projectsController.addpost);
projectsRouter.get("/delete/:id", projectsController.delete);
projectsRouter.get("/:id/", projectsController.getProject);

module.exports = projectsRouter;
