const db = require("../config/db");


const userLiked = (userId, postId) =>{
  return new Promise((resolve, reject) => {
    const q = "SELECT COUNT(*) AS liked FROM post_likes WHERE post_id = ? AND user_id = ?";
    db.query(q, [postId, userId], (err, data) => {
        if (err) reject(err)
        else if(data[0].liked > 0) resolve(true)
        else resolve(false)
    });
})}


const insertLike = (userId, postId) =>{
  return new Promise((resolve, reject) => {
    const q = "INSERT INTO post_likes (`post_id`, `user_id`) VALUE (?)";
    const values = [parseInt(postId), userId];
    db.query(q, [values], (err, data) => {
        if (err)  reject(err) 
        resolve(true)
    });
})}

const removeLike = (userId, postId) =>{
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM post_likes where user_id = ? AND post_id = ?";
    db.query(q, [userId, postId], (err, data) => {
        if (err) reject(err)
        resolve(true)
    });
})}

const likesCount = (postId) =>{
  return new Promise((resolve, reject) => {
    const q = "SELECT COUNT(*) AS likes FROM post_likes WHERE post_id = ?";
    db.query(q, [postId], (err, data) => {
        if (err) reject(err)
        resolve(data[0].likes)
    });
})}

module.exports = {
    userLiked,
    insertLike,
    removeLike,
    likesCount,
}