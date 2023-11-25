import customAsyncHandler from "../middleware/customAsyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../services/generateToken.js";

// @desc Login User
// @route post /api/v1/users
// @access Public
const authUser = customAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordMatched = user.matchPassword(password);
  if (user && isPasswordMatched) {
    const token = generateToken(user._id);
    // Set the token as a cookie with expiration
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
      secure: process.env.NODE_ENV !=='development',
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Regiser User
// @route post /api/v1/users/register
// @access Public
const registerUser = customAsyncHandler(async (req, res) => {
  res.send("Register User");
});

// @desc Logout User
// @route post /api/v1/users/logout
// @access Public
const logoutUser = customAsyncHandler(async (req, res) => {
  res.send("Logout User");
});

// @desc User profile
// @route get /api/v1/users/profile
// @access private
const userProfile = customAsyncHandler(async (req, res) => {
  res.send("User Profile");
});

// @desc User profile Update
// @route put /api/v1/users/profile
// @access private
const updateProfile = customAsyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

// @desc Fetch Users
// @route get /api/v1/users
// @access private/admin
const getUsers = customAsyncHandler(async (req, res) => {
  res.send("Get Users list");
});

// @desc Delete User
// @route delete /api/v1/users/:id
// @access private/admin
const deleteUser = customAsyncHandler(async (req, res) => {
  res.send("Delete User");
});

// @desc get User
// @route get /api/v1/users/:id
// @access private/admin
const getUser = customAsyncHandler(async (req, res) => {
  res.send("get User");
});

// @desc update User
// @route put /api/v1/users/:id
// @access private/admin
const updateUser = customAsyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  userProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
};
