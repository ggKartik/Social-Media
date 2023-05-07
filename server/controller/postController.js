const Post = require("../modals/postModal");
const User = require("../modals/userModal");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "Post_Social",
    //   width: 150,
    //   crop: "scale",
    // });
    const { text, firstName, lastName, avatarUrl, url, user, occupation } =
      req.body;
    // const user = req.user._id;
    const post = await Post.create({
      user,
      firstName,
      lastName,
      avatarUrl,
      text,
      occupation,
      image: {
        public_id: "Post_Social",
        url: url,
      },
    });
    if (post) {
      res.status(201).json({
        success: true,
        message: "Post Created Successfully",
        post,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.status(200).json({
        success: true,
        message: "All Posts",
        posts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
  } catch (error) {
    res.sataus(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    if (posts) {
      res.status(200).json({
        success: true,
        message: "All Posts",
        posts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const isliked = post.likes.find(
        (like) => like.user.toString() === req.user._id.toString()
      );
      if (isliked) {
        post.likes = post.likes.filter(
          (like) => like.user.toString() !== req.user.id.toString()
        );
        res.status(200).json({
          success: true,
          message: "Post Unliked",
          post,
          isLiked: "unliked",
        });
      } else {
        post.likes.push({ user: req.user._id });
        res.status(200).json({
          success: true,
          message: "Post Liked",
          post,
          isLiked: "liked",
        });
      }
      await post.save();
    } else {
      res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.body.postId);
    const { comment } = req.body;

    if (post) {
      const newComment = {
        user: req.user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatar.url,
        comment,
      };
      post.comments.push(newComment);
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment Added",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const commentId = req.body.commentId;

    if (post) {
      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== commentId.toString()
      );
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment Deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
