const db = require("../config/db");

const getAllComments = (postId)=>{
  return new Promise((resolve, reject) => {
    // const q = "SELECT * FROM comment WHERE post_id=? ";
    const q = `
    SELECT
      c.id,
      c.comment,
      c.post_id,
      c.created_at,
      c.updated_at,
      c.user_id,
      u.username AS author,
      u.picture AS profilePic
    FROM
      comment c
    INNER JOIN user u ON u.id = c.user_id
    WHERE c.post_id = ?
    `;
    db.query(q, [postId], (err, data) => {
      if (err)reject(err)
      if (data) resolve(data) 
      reject(false) 
    });
})}

const updateComment = (cmtId, content)=>{
  return new Promise((resolve, reject) => {
  const q = "UPDATE comment SET `comment`=? WHERE id=? ";

    db.query(q, [content,cmtId], (err, data) => {
      if (err)reject(err)
    if (data.affectedRows > 0) resolve(data) 
    });
})}

const getCommentByIdAndDelete = (id)=>{
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM comment WHERE `id`=?";

    db.query(q, [id], (err, data) => {
      if (err)reject(err)
      if (data.affectedRows > 0) resolve(true) 
      reject(false) 
    });
})}

const createComment = (cmt)=>{
  return new Promise((resolve, reject) => {
    const q = "INSERT INTO comment (`comment`,`author`,`post_id`,`user_id`,`profilePic`) VALUE (?) ";

    const values = [
      cmt.comment,
      cmt.author,
      cmt.postId,
      cmt.userId,
      cmt.profilePic,
    ];

    db.query(q, [values], (err, data) => {
        if (err) reject(err)
        resolve(data)
    });
})}



module.exports = {
    getAllComments,
    getCommentByIdAndDelete,
    createComment,
    updateComment    
}