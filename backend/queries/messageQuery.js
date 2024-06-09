const db = require("../config/db");

function create_msg(sender_id, receiver_id, content){
  return new Promise((resolve, reject) => {
  const q = "INSERT INTO messages (`sender_id`, `receiver_id`, `content`) VALUE (?,?,?)";
  const senderId = parseInt(sender_id);
  const receiverId = parseInt(receiver_id);
  db.query(q, [senderId, receiverId, content], (err, data) => {
    if (err) reject(err); 
    else if (!data || data.length === 0) {
      resolve(false); 
    } 
    else resolve(data[0])
  });
})}

function fetch_msgs(sender_id, receiver_id){
  return new Promise((resolve, reject) => {
  const q = `
      SELECT *
      FROM messages
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
      ORDER BY timestamp ASC;
    `;
  const senderId = parseInt(sender_id);
  const receiverId = parseInt(receiver_id);
  db.query(q, [senderId, receiverId, receiverId, senderId], (err, data) => {
    if (err) reject(err); 
    console.log(data);
    resolve(data)
  });
})}

module.exports = {
    create_msg,
    fetch_msgs,
}