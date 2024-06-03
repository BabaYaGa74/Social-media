const asyncHandler = require("express-async-handler");
const UserQuery = require("../models/userQuery");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const AuthQuery = require("../models/authQuery");

//@desc   Gets the user
//@routes GET /api/users/user/:id
//@access private
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserQuery.getUserById(id);
  const { password, ...info } = user;
  if (user) {
    res.status(200).json({
      message: "User found successfully",
      info,
    });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

//@desc   Updates the existing user
//@routes PUT /api/users/user/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let {
    username,
    password,
    name,
    email,
    picture,
    coverPicture,
    website,
    instagram,
    facebook,
    country,
  } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  const user = await UserQuery.findByIdAndUpdate(
    id,
    {
      username,
      name,
      password,
      email,
      picture,
      coverPicture,
      website,
      instagram,
      facebook,
      country,
    }
  );
  if (user) {
    generateToken(res, user.id, user.username, user.picture, user.name);
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } else {
    res.status(400);
    throw new Error("Error occured during update");
  }
});

//@desc   Deletes the existing user
//@routes DELETE /api/users/user/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await UserQuery.getUserByIdAndDelete(id);
  if (deletedUser) {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({
      message: "User deleted with comments and posts successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});




const getAllUsers = asyncHandler(async(req, res) => {
 const users = await UserQuery.getAllUsers();
 if(users){
  res.status(200).json({users:users});
 }else{
  res.status(400);
  throw new Error("ERROR OCCURRED");
 }

})


//@desc   Changes the existing password
//@routes PUT /api/users/user/pass/:id
//@access private
const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { password, newPassword } = req.body;

  const user = await UserQuery.getUserById(id);
  console.log("USER: ", user);
  if (!user) {
    res.status(404);
    throw new Error("User Doesn't Exists");
  }
  const matched = await AuthQuery.matchPassword(user.password, password);
  console.log("MATCHED: ", matched);

  if (user && matched) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
  } else {
    res.status(400);
    throw new Error("Invalid password");
  }

  const updatePassword = await UserQuery.updatePassword(id, newPassword);
  console.log("UPDATED PASSWORD: ", updatePassword)
  if (updatePassword) {
    res.status(200).json(updatePassword);
  } else {
    res.status(400);
    throw new Error("Cannot update User");
  }
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  getAllUsers,
};
