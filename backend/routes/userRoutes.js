const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  getAllUsers
} = require("../controllers/userController");

router
  .route("/user/:id")
  .get(protect, getUser)
  .delete(protect, deleteUser);
router.route("/update/user").put(updateUser);
router.route("/user/pass/:id").put(protect, changePassword);
router.route("/details").get(getAllUsers);

module.exports = router;
