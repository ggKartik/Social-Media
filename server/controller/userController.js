const User = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
exports.registerUser = async (req, res) => {
  try {
    if (!req.body.avatar)
      return res
        .status(400)
        .json({ success: false, message: "Please Upload Avatar" });

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avatar_Social",
      width: 150,
      crop: "scale",
    });
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      country,
      occupation,
    } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      country,
      occupation,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "User Created Successfully",
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something Went Wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (isPasswordMatched) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
        res.status(200).json({
          success: true,
          message: "User Logged In Successfully",
          user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Credentials Does Not Matched",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Found",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Found",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const friend = await User.findById(req.body.id);
    const user = await User.findById(req.user.id);
    if (friend) {
      await user.friends.push({
        user: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        avatarUrl: friend.avatar.url,
        occupation: friend.occupation,
      });
      await friend.friends.push({
        user: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatar.url,
        occupation: user.occupation,
      });
      await friend.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Friend Added Successfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.body.id);

    if (friend) {
      user.friends = user.friends.filter(
        (friend) => friend.user.toString() !== req.body.id
      );
      friend.friends = friend.friends.filter(
        (friend) => friend.user.toString() !== req.user.id
      );
      await friend.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Friend Removed Successfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const { linkedIn, twitter } = req.body;
      if (linkedIn) user.linkedIn = linkedIn;
      if (twitter) user.twitter = twitter;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
