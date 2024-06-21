const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  singlePost,
  userPost,
  // repost
  // sharePost,
} = require("../controllers/postController");

router.post("/create", protect,  createPost);
router.put("/update/:id", protect, updatePost);
router.delete("/delete/:id", protect, deletePost);
router.get("/", protect, getPosts);
router.get("/:id", protect, singlePost);
router.get("/user/:userId", protect, userPost);
// router.post("/repost", protect,  repost);
// router.get("/:id/link", protect, sharePost);

module.exports = router;
