const express = require("express");
const eventsController = require("../controllers/eventsController.js");
const eventsRouter = express.Router();

eventsRouter.get("/", eventsController.index);
eventsRouter.get("/add/", eventsController.addget);
eventsRouter.post("/add", eventsController.addpost);
eventsRouter.get("/delete/:id", eventsController.delete);
eventsRouter.get("/:id/", eventsController.getEvent);

module.exports = eventsRouter;
