const asyncHandler = require("express-async-handler");
const LikesQuery = require("../queries/likesQuery");

//@desc   Likes the post
//@routes POST /api/like/:postId/like
//@access private
const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const liked = await LikesQuery.userLiked(userId, postId);
  if (!liked) {
    const inserted = await LikesQuery.insertLike(userId, postId)
    if(inserted){
      const total_likes = await LikesQuery.likesCount(postId);
      res.json({ likesCount: total_likes });
    } 
  }
  const total_likes = await LikesQuery.likesCount(postId);
  res.json({ likesCount: total_likes });
});


//@desc   Unlikes the post
//@routes Delete /api/like/:postId/unlike
//@access private
const unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const liked = await LikesQuery.userLiked(userId, postId);
  if (liked) {
    const removed = await LikesQuery.removeLike(userId, postId)
    const total_likes = await LikesQuery.likesCount(postId);
    if(removed) res.json({likesCount: total_likes})
  }else{
    const total_likes = await LikesQuery.likesCount(postId);
    res.json({ likesCount: total_likes });
}
});


//@desc   Gives the likes details of post
//@routes Delete /api/like/:postId/detail
//@access private
const likesDetails = asyncHandler(async(req, res)=> {
  const {postId} = req.params;
  const userId = req.user.id;
  const total_likes = await LikesQuery.likesCount(postId);
  const liked = await LikesQuery.userLiked(userId, postId);
  if(liked) {
    res.json({likesCount: total_likes, liked: liked})
  }else{
    res.json({ likesCount: total_likes, liked: liked });
  }
});

module.exports = {
  likePost,
  unlikePost,
  likesDetails
};
