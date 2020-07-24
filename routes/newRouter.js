const express = require("express");
const newController = require("../controllers/newController.js");
const newRouter = express.Router();

newRouter.get("/:lang", newController.index);
newRouter.get("/add/:lang", newController.addget);
newRouter.post("/add", newController.addpost);
newRouter.get("/delete/:id", newController.delete);
newRouter.get("/:id/:lang", newController.getNew);

module.exports = newRouter;
