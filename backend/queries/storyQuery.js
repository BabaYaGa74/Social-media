const db = require("../config/db");

const createStory = (storyInfo)=>{
  return new Promise((resolve, reject) => {
    const q = "INSERT INTO story (`content`,`username`,`userId`) VALUE (?) ";
    const values = [
        storyInfo.content,
        storyInfo.username,
        storyInfo.userId,
    ];
    db.query(q, [values], (err, data) => {
        if (err) reject(err)
        resolve(data)
    });
})}

const getAllStory = ()=>{
  return new Promise((resolve, reject) => {
  const q = `
    SELECT
      s.id,
      s.content,
      s.created_at,
      s.userId,
      u.username,
      u.picture 
    FROM
      story s
    INNER JOIN user u ON u.id = s.userId
  `;

  db.query(q, [], (err, data) => {
    if (err) return reject(err);
    else if (!data || data.length === 0)  reject("Story not found"); 
    else resolve(data);
  });
})}
const getStoryByUserId = (userId)=>{
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM story WHERE userId=?";

  db.query(q, [userId], (err, data) => {
    if (err) return reject(err);
    else if (!data || data.length === 0)  reject("Story not found"); 
    else resolve(data);
  });
})}

const deleteStoryById = async (storyId) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM story WHERE id=?";

    db.query(q, [storyId], (err, data) => {
      if (err) reject(err);
      if (data.affectedRows > 0) resolve(true);
      reject(false);
    });
  });
};



module.exports = {
    createStory,
    getStoryByUserId,
    deleteStoryById,
    getAllStory, 
}