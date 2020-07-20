const express = require("express");
const newController = require("../controllers/newController.js");
const newRouter = express.Router();

newRouter.get("/:lang", newController.index);

module.exports = newRouter;
