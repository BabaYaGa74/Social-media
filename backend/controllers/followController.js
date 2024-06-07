const asyncHandler = require("express-async-handler");
const FollowerQuery = require("../queries/followerQuery");

const followUser = asyncHandler(async (req, res) => {
  const { userIdToFollow } = req.body;
  const followerId = req.user.id;

  const insertion = await FollowerQuery.addFollower(userIdToFollow, followerId)
  if(insertion) {
    res
      .status(200)
      .json({ message: "Followed successfully",id:insertion.insertId});
  } else {
    res
      .status(200)
      .json({ message: "Follow unsuccessful" });
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { userIdToUnfollow } = req.body;
  const followerId = req.user.id;

  const deleted = await FollowerQuery.removeFollower(userIdToUnfollow, followerId)
  if(deleted){
    res
      .status(200)
      .json({ message: "Unfollowed successfully", id:followerId });
  }
});

const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const followersObj = await FollowerQuery.getFollowers(userId);
  const followingObj = await FollowerQuery.getFollowings(userId);

  const followers = followersObj.map((follower) => follower.follower_id)
  const followings = followingObj.map((following) => following.user_id)
  
  res
    .status(200)
    .json({ message: "These are the followers", followers, followings });
});

const getFollowersDetails = asyncHandler(async (req, res) => {
  const followersIds = req.body.followersIds;
  const followingIds = req.body.followingIds;

  var followersData = [];
  var followingData = [];

  if(followersIds.length > 0){
   followersData = await FollowerQuery.getDetails(followersIds);
  }

  if(followingIds.length > 0){
   followingData = await FollowerQuery.getDetails(followingIds);
  }

  res.status(200).json({ followersData, followingData });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowersDetails,
};
