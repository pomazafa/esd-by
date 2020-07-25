const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.post("/authenticate", userController.authenticate);
userRouter.get("/login", userController.index);
userRouter.post("/change", userController.update);
userRouter.get("/logout", userController.exit);

module.exports = userRouter;
