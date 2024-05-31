const asyncHandler = require("express-async-handler");
const LikesQuery = require("../models/likesQuery");

//@desc   Likes the post
//@routes POST /api/like/:postId/like
//@access private
const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  console.log(userId);
  const liked = await LikesQuery.userLiked(userId, postId);
  if (!liked) {
    const inserted = await LikesQuery.insertLike(userId, postId)
    if(inserted) res.json({message:"POST Liked!"})
  }
  const total_likes = await LikesQuery.likesCount(postId);
  res.json({ likesCount: total_likes });
});

//@desc   Unlikes the post
//@routes Delete /api/like/:postId/unlike
//@access private
const unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const liked = await LikesQuery.userLiked(userId, postId);
  if (liked) {
    const removed = await LikesQuery.remove(userId, postId)
    if(removed) res.json({message:"POST UnLiked!"})
  }
  const total_likes = await LikesQuery.likesCount(postId);
  res.json({ likesCount: total_likes });
});

module.exports = {
  likePost,
  unlikePost,
};
