const db = require("../config/db");
const bcrypt = require("bcryptjs");
const UserQuery = require("./userQuery");

const findUser = (email)=>{
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM user WHERE email=?";
  db.query(q, [email], (err, data) => {
    if (err) reject(err); 
    else if (!data || data.length === 0) {
      resolve(false); 
    } 
    else resolve(data[0])
  });
})}

const createUser = (User)=>{
  return new Promise((resolve, reject) => {
  const salt =  bcrypt.genSaltSync(10);
  const hashedPassword =  bcrypt.hashSync(User.password, salt);

    const q = "INSERT INTO user (`username`,`name`,`email`,`password`,`picture`) VALUE (?)";

    const values = [
      User.username,
      User.name,
      User.email,
      hashedPassword,
      User.picture,
    ];

    db.query(q, [values], (err, data) => {
        if (err) reject(err)
        if(data.affectedRows > 0 ) {
         UserQuery.getUserById(data.insertId).then(user => resolve(user)).catch(err => reject(err))
        }
    });
})}

const matchPassword = async function (actualPassword, enteredPassword) {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

module.exports = {
    findUser,
    createUser, 
    matchPassword
}