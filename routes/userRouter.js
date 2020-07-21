const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.use("/authenticate", userController.authenticate);
userRouter.use("/", userController.index);
userRouter.use("/exit", userController.exit);

module.exports = userRouter;
