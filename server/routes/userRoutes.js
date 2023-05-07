const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  logout,
  getMyDetails,
  addFriend,
  removeFriend,
  updateProfile,
} = require("../controller/userController");
const { isAuthenticated } = require("../utils/auth");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/me").get(isAuthenticated, getMyDetails);
userRouter.route("/user/:id").get(isAuthenticated, getUserDetails);
userRouter.route("/logout").get(isAuthenticated, logout);
userRouter.route("/addfriend").put(isAuthenticated, addFriend);
userRouter.route("/removefriend").put(isAuthenticated, removeFriend);
userRouter.route("/addsocialid").put(isAuthenticated, updateProfile);

module.exports = userRouter;
