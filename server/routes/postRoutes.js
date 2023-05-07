const express = require("express");
const {
  createPost,
  getAllPosts,
  likePost,
  getUserPosts,
  addComment,
  deleteComment,
} = require("../controller/postController");
const { isAuthenticated } = require("../utils/auth");

const postRouter = express.Router();

postRouter.route("/createpost").post(isAuthenticated, createPost);
postRouter.route("/allposts").get(isAuthenticated, getAllPosts);
postRouter.route("/user/post/:id").get(isAuthenticated, getUserPosts);
postRouter.route("/likepost/:id").put(isAuthenticated, likePost);
postRouter.route("/addcomment").put(isAuthenticated, addComment);
postRouter.route("/deletecomment").put(isAuthenticated, deleteComment);
module.exports = postRouter;
