import customAsyncHandler from "../middleware/customAsyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../services/generateToken.js";

// @desc Login User
// @route post /api/v1/users
// @access Public
const authUser = customAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
    generateToken(res, user._id);

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
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(401);
    throw new Error("User already exist");
  }
  if (email && password && name) {
    const newUser = new User({
      email,
      password,
      name,
    });
    const savedUser = await newUser.save();
    generateToken(res, savedUser._id);

    // Send the response without the password field
    res.status(201).json({
      userInfo: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      },
    });
  } else {
    throw new Error("Please fill all fields");
  }
});

// @desc Logout User
// @route post /api/v1/users/logout
// @access Public
const logoutUser = customAsyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout successful",
  });
});

// @desc User profile
// @route get /api/v1/users/profile
// @access private
const userProfile = customAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userInfo = await User.findById(userId);
  if (userInfo) {
    res.json({
      _id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

// @desc User profile Update
// @route put /api/v1/users/profile
// @access private
const updateProfile = customAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const dbUser = await User.findById(userId);

  const conditions = {
    _id: userId,
  };
  // dbUser: req.body.name || dbUser.name,
  //   dbUser: req.body.email || dbUser.email,
  //   dbUser: req.body.password || dbUser.password,
  //   isAdmin: dbUser.isAdmin,
  if(dbUser){
    dbUser.name=req.body.name || dbUser.name;
    dbUser.email=req.body.email || dbUser.email;
    dbUser.password=req.body.password || dbUser.password;
  }
  

  const updatedInfo = await dbUser.save()
  if (updatedInfo) {
    res.json({
      _id: updatedInfo._id,
      name: updatedInfo.name,
      email: updatedInfo.email,
      isAdmin: updatedInfo.isAdmin,
    });
  } else {
    throw new Error("Some thing went wrong !");
  }
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
