const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.post("/authenticate", userController.authenticate);
userRouter.get("/", userController.index);
userRouter.post("/change", userController.update);
userRouter.get("/exit", userController.exit);

module.exports = userRouter;
