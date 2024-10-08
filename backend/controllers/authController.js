const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const AuthQuery = require("../queries/authQuery");
const {validateInput} = require("../utils/validation");

//@desc   Registers the user
//@routes POST /api/auth/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password, picture } = req.body;

  const input = { username, name, email, password, picture }
  const validationResponse = validateInput(input);
  if(!validationResponse.isValid){
    return res.json({
      success: false,
      message:validationResponse.message
    })
  }

  const userExists = await AuthQuery.findUser(email);
  if (userExists) {
    return res.json({
      success:false,
      message:"User already Exists"
    })
  }
  const user = await AuthQuery.createUser({ username, name, email, password, picture });
  if (user) {
    res.status(201).json({
      success: true,
      message: "User created Successfully!",
      userId: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400).json({
      success:false,
      message:"Registration Failed!",
    })
  }
});

//@desc   Authenticates the user
//@routes POST /api/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthQuery.findUser(email);
  if (!user) {
    res.status(404);
    throw new Error("User Doesn't Exists");
  }
  const matched = await AuthQuery.matchPassword(user.password, password);

  if (user && matched) {
    generateToken(res, user.id, user.username, user.picture,user.coverPicture, user.name );
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//@desc   Logs out of the app
//@routes POST /api/auth/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({ message: "Logged Out Successfully!" });
});

//@desc   Checks for the user
//@routes GET /api/auth/refetch
//@access private
const getUser = asyncHandler(async (req, res) => {
  let token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) return res.status(404).json(err);
      console.log("TOKEN DATA: ", data)
      res.status(200).json(data);
    });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
