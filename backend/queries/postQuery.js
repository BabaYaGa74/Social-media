const db = require("../config/db");

const createPost = (postInfo)=>{
  return new Promise((resolve, reject) => {
    const q = "INSERT INTO post (`description`,`photo`,`username`,`userId`,`profilePic`) VALUE (?)";
    const values = [
        postInfo.desc,
        postInfo.photo,
        postInfo.username,
        postInfo.userId,
        postInfo.profilePic,
    ];
    db.query(q, [values], (err, data) => {
        if (err) reject(err)
        if(data ) {
         getPostById(data.insertId).then(post => resolve(post)).catch(err => reject(err))
        }
    });
})}
const getAllPosts = ()=>{
  return new Promise((resolve, reject) => {
  const q = `
    SELECT
      p.id,
      p.description,
      p.photo,
      p.created_at,
      p.updated_at,
      p.userId,
      u.username,
      u.picture AS profilePic
    FROM
      post p
    INNER JOIN user u ON u.id = p.userId
  `;

  db.query(q, [], (err, data) => {
    if (err) return reject(err);
    else if (!data || data.length === 0)  reject("No post available"); 
    else resolve(data);
  });
})}

const getPostById = (postId)=>{
  return new Promise((resolve, reject) => {
  const q = `
    SELECT
      p.id,
      p.description,
      p.photo,
      p.created_at,
      p.updated_at,
      p.userId,
      u.username,
      u.picture AS profilePic
    FROM
      post p
    INNER JOIN user u ON u.id = p.userId
    WHERE p.id = ?
  `;
  db.query(q, [postId], (err, data) => {
    if (err) return reject(err);
    else if (!data || data.length === 0)  reject("Post not found"); 
    else resolve(data[0]);
  });
})}

const getUserPost = (userId)=>{
  return new Promise((resolve, reject) => {
  const q = `
    SELECT
      p.id,
      p.description,
      p.photo,
      p.created_at,
      p.updated_at,
      p.userId,
      u.username,
      u.picture AS profilePic
    FROM
      post p
    INNER JOIN user u ON u.id = p.userId
    WHERE p.userId = ?
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return reject(err);
    resolve(data);
  });
})}

const getPostByIdAndUpdate = (postId, postInfo)=>{
  return new Promise((resolve, reject) => {
    const q = "UPDATE post SET `description`=?,`photo`=?,`username`=?,`userId`=? WHERE id=? ";
    db.query(
      q,
      [
        postInfo.description,
        postInfo.photo,
        postInfo.username,
        postInfo.userId,
        postId
      ],
      (err, data) => {
        if (err) reject(err)
        if (data.affectedRows > 0){
          getPostById(postId).then(post =>{ resolve(post)})
          .catch(err => reject(err))
        }
        reject(false);
      }
    );
})}

const deletePostById = (postId) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM post WHERE id=?";
    console.log("POST ID: ", postId);

    db.query(q, [postId], (err, data) => {
      if (err) reject(err);
      console.log("DELETED: ", data)
      if (data.affectedRows > 0) resolve(true);
      reject(false);
    });
  });
};

module.exports = {
    createPost,
    getPostById,
    deletePostById,
    getPostByIdAndUpdate,
    getUserPost,
    getAllPosts
}