const db = require("../config/db");

const getUserById = (userId)=>{
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM user WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return reject(err);
    else if (!data || data.length === 0)  reject("User not found"); 
    else resolve(data[0]);
  });
})}

const getUserByEmail = (email)=>{
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM user WHERE email=?";

  db.query(q, [email], (err, data) => {
    if (err) return reject(err);
    resolve(data[0]);
  });
})}

const getUserByIdAndUpdate = async(userId, userInfo)=>{
  return new Promise((resolve, reject) => {
    const q = "UPDATE user SET `username`=?,`name`=?,`picture`=?, `coverPicture`=?, `instagram`=?, `facebook`=? WHERE id=? ";
    console.log("In query")
    db.query(
      q,
      [
      userInfo.username,
      userInfo.name,
      userInfo.picture,
      userInfo.coverPicture,
      userInfo.instagram,
      userInfo.facebook,
      userId
      ],
      (err, data) => {
        if (err) reject(err)
        if (data.affectedRows > 0){
          getUserById(userId).then(user => {
            console.log("IN USER: ", user);
            resolve(user)
          })
          .catch(err => reject(err))
        }
        reject(false);
      }
    );
})}
      
const getUserByIdAndDelete = async (userId) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM user WHERE id=?";

    db.query(q, [userId], (err, data) => {
      if (err) reject(err);
      if (data.affectedRows > 0) resolve(true);
      reject(false);
    });
  });
};

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    const q = "SELECT id,name,picture FROM user";

    db.query(q, [], (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
      reject(false);
    });
  });
};

const updatePassword = async(userId, password)=>{
  return new Promise((resolve, reject) => {
  const q = "UPDATE user SET `password`=? WHERE id=?";

    db.query(q, [password,userId], (err, data) => {
      if (err)reject(err)
      if (data.affectedRows > 0) resolve(true) 
      reject(false) 
    });
})}


module.exports = {
    getUserById,
    getUserByIdAndUpdate,
    getUserByEmail, 
    getUserByIdAndDelete,
    updatePassword,
    getAllUsers,
}