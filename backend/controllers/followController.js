const asyncHandler = require("express-async-handler");
const FollowerQuery = require("../models/followerQuery");

const followUser = asyncHandler(async (req, res) => {
  const { userIdToFollow } = req.body;
  const followerId = req.user.id;

  const insertion = await FollowerQuery.addFollower(userIdToFollow, followerId)
  if(insertion) {
    res
      .status(200)
      .json({ message: "Followed successfully"});
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
      .json({ message: "Unfollowed successfully"});
  }
});

const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const followers = await FollowerQuery.getFollowers(userId);
  const following = await FollowerQuery.getFollowings(userId);
  res
    .status(200)
    .json({ message: "These are the followers", followers, following });
});

const getFollowersDetails = asyncHandler(async (req, res) => {
  const followersIds = req.body.followersIds;
  const followingIds = req.body.followingIds;

  console.log("Following IDs", followingIds);
  console.log("Followers IDs", followersIds);

  const followersData = await FollowerQuery.getDetails(followersIds);
  const followingData = await FollowerQuery.getDetails(followingIds);
  res.status(200).json({ followersData, followingData });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowersDetails,
};
