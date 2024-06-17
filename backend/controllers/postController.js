const asyncHandler = require("express-async-handler");
const PostQuery = require("../queries/postQuery");

//@desc   Creates new post
//@routes POST /api/post/createPost
//@access private
const createPost = asyncHandler(async (req, res) => {
  const { desc, photo, username, userId, profilePic } = req.body;
  const newPost = await PostQuery.createPost({
    desc,
    photo,
    username,
    userId,
    profilePic,
  });
  if (newPost) {
    res.status(200).json({ message: "Post Created Successfully!", newPost });
  } else {
    res.status(400);
    throw new Error("Failed to create Post");
  }
});

//@desc   updates the post
//@routes PUT /api/post/update/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, photo, username, userId } = req.body;
  const content = { description, photo, username, userId };

  const updatedPost = await PostQuery.getPostByIdAndUpdate(id, content);
  if (updatedPost) {
    res
      .status(200)
      .json({ message: "Post updated Successfully!", updatedPost });
  } else {
    res.status(400);
    throw new Error("Failed to update Post");
  }
});

//@desc   Deletes the post
//@routes DELETE /api/post/delete/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await PostQuery.deletePostById(id);
  if (deletedPost) {
    res.status(200).json({
      message: "Post deleted Successfully!",
      deletedPost,
    });
  } else {
    res.status(400);
    throw new Error("Failed to delete Post");
  }
});

//@desc   Gets single post details
//@routes GET /api/post/:id
//@access private
const singlePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const postDetail = await PostQuery.getPostById(id);
  console.log("POST DETAILS: ", postDetail)
  if (postDetail) {
    res.status(200).json({ message: "Post found!", postDetail });
  } else {
    res.status(400);
    throw new Error("Failed to get Post");
  }
});

//@desc   Gets single post details
//@routes GET /api/post/user/:userId
//@access private
const userPost = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const postDetail = await PostQuery.getUserPost(userId);
  if (postDetail) {
    res.status(200).json({ message: "User Post found!", postDetail });
  } else {
    res.status(400);
    throw new Error("Failed to get user's Post");
  }
});

// @desc   Gets all the posts
// @routes GET /api/post/
// @access private
const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await PostQuery.getAllPosts();
  console.log("ALL: ", allPosts);
  if (allPosts) {
    res.status(200).json({ message: "all Post found!", allPosts});
  } else {
    res.status(400);
    throw new Error("Failed to fetch posts");
  }
});

//TODO: Try reimplementing this concept in the future

// const repost = asyncHandler(async (req, res) => {
//  const { userId, postId } = req.body;

//   try {
//     const post = await PostQuery.getPostById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Check if the user has already reposted this post
//     const reposted = await PostQuery.checkIfReposted(userId,postId);
//     if (reposted) {
//       return res.status(400).json({ message: 'You have already reposted this post' });
//     }

//     // Insert the repost record
//     await PostQuery.insertRepost(userId,postId);
//     res.status(201).json({ message: 'Post reposted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// const sharePost = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const shareLink = `${req.protocol}://${req.get("host")}/post/${id}`;
//   if (shareLink) {
//     res.status(200).json(shareLink);
//   } else {
//     res.status(400);
//     throw new Error("Error while creating link");
//   }
// });

module.exports = {
  createPost,
  updatePost,
  deletePost,
  singlePost,
  getPosts,
  userPost,
  // repost,
};
