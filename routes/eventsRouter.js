const express = require("express");
const eventsController = require("../controllers/eventsController.js");
const eventsRouter = express.Router();
const fileUploadUtil = require('../util/fileUploadUtil');

eventsRouter.get("/", eventsController.index);
eventsRouter.get("/add/", eventsController.addget);
eventsRouter.post("/add", fileUploadUtil.multerMw.array('photos'), eventsController.addpost);
eventsRouter.get("/delete/:id", eventsController.delete);
eventsRouter.get("/:id/", eventsController.getEvent);

module.exports = eventsRouter;
