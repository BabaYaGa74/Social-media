const db = require("../config/db");

const addFollower = (userId, followerId) => {
  return new Promise((resolve, reject) => {
  const q = "INSERT INTO userfollowers (`user_id`, `follower_id`) VALUES (?)";

  const values = [userId, followerId];
  db.query(q, [values],  (err, data) => {
    if (err) return reject(err);
    resolve(data);
  })
})}

const removeFollower = (userId, followerId) => {
  return new Promise((resolve, reject) => {
  const q = "DELETE FROM userfollowers WHERE user_id = ? AND follower_id = ?";

  db.query(q, [userId, followerId],  (err, data) => {
    if (err) return reject(err);
    resolve(true);
  })
})}

const getFollowers = (userId, followerId) => {
  return new Promise((resolve, reject) => {
  const q = "SELECT follower_id FROM userfollowers WHERE user_id = ? ";

  db.query(q, [userId],  (err, data) => {
    if (err) return reject(err);
    resolve(data);
  })
})}

const getFollowings = (followerId) => {
  return new Promise((resolve, reject) => {
  const q = "SELECT user_id FROM userfollowers WHERE follower_id = ?";

  db.query(q, [followerId],  (err, data) => {
    if (err) return reject(err);
    resolve(data);
  })
})}

const getDetails = (ids) => {
  return new Promise((resolve, reject) => {
    const userIdsStr = ids.join(",");
    if(userIdsStr){
      const q = `SELECT id, username, picture FROM user WHERE id IN (${userIdsStr})`;
      db.query(q, (err, data) => {
        if (err) return reject(err);
        console.log("WE ARE IN")
        console.log(data)
        resolve(data)
      })
    }
  })
}


module.exports = {
    addFollower, 
    removeFollower,
    getFollowers,
    getFollowings,
    getDetails
}