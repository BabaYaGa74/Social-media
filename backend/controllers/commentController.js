const asyncHandler = require("express-async-handler");
const CommentQuery = require("../models/commentQuery");

//@desc   Creates the new comment
//@routes POST /api/comment/create
//@access private
const createComment = asyncHandler(async (req, res) => {
  const { comment, author, postId, userId, profilePic } = req.body;
  const newComment = await CommentQuery.createComment({
    comment,
    author,
    postId,
    userId,
    profilePic,
  });
  if (newComment) {
    res
      .status(200)
      .json({ message: "Comment Created Successfully!", newComment });
  } else {
    res.status(400);
    throw new Error("Failed to create comment");
  }
});

//@desc   updates the comment
//@routes POST /api/comment/update/:id
//@access private
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const updatedComment = await CommentQuery.updateComment(
    id,
    comment,
  );
  if (updatedComment) {
    res.status(200).json({
      message: "Updated Successfully",
      comment: updatedComment.comment,
    });
  } else {
    res.status(400);
    throw new Error("Failed to update comment");
  }
});

//@desc   deletes the comment
//@routes POST /api/comment/delete/:id
//@access private
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await CommentQuery.getCommentByIdAndDelete(id);
  if (deleted) {
    res.status(200).json({
      message: "Deleted Succesfully",
      deleted,
    });
  } else {
    res.status(400);
    throw new Error("Deletion failed");
  }
});

//@desc   gets all the comment of post
//@routes GET /api/comment/post/:postId
//@access private
const getCommentOfPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const allComments = await CommentQuery.getAllComments(postId);
  if (allComments) {
    res.status(200).json({
      message: "Got all the comments successfully",
      allComments,
    });
  } else {
    res.status(400);
    throw new Error("Unable to fetch comments");
  }
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentOfPost,
};
