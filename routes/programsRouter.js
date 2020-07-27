const express = require("express");
const programsController = require("../controllers/programsController.js");
const programsRouter = express.Router();
const fileUploadUtil = require('../util/fileUploadUtil');

programsRouter.get("/", programsController.index);
programsRouter.get("/add/", programsController.addget);
programsRouter.post("/add", fileUploadUtil.multerMw.single('photo'), programsController.addpost);
programsRouter.get("/delete/:id", programsController.delete);
programsRouter.get("/:id/", programsController.getProgram);

module.exports = programsRouter;
