const {create_msg, fetch_msgs}= require("../queries/messageQuery");

let activeUsers = {};

class MsgController{
    constructor(io){
        this.io = io;
        this.setupSocketEvent();
    }
    async setupSocketEvent() {
        this.io.on('connection', (socket) => {
            console.log('User connected');

            socket.on('login', (userId) => {
                activeUsers[userId] = true;
                console.log("ACTIVE: ", activeUsers);
                this.io.emit('statusUpdate', Object.keys(activeUsers));
            })

            socket.on('logout', (userId) => {
                delete activeUsers[userId];
                this.io.emit('statusUpdate', Object.keys(activeUsers));
            })

            socket.on('chat message', (data) => {
                const { sender_id, receiver_id, content } = data;
                    create_msg(sender_id, receiver_id, content).then(msg=> console.log(msg)).catch(err => console.log(err));
                    console.log("Sender: ",  sender_id, "Receiver: ", receiver_id,"Message :",  content);
                    this.io.emit('chat message', data);
            });

            socket.on('fetch messages', (data) =>{
                const {sender_id, receiver_id} = data;
                fetch_msgs(sender_id,receiver_id).then(result =>{
                    this.io.emit('fetch messages', result);
                }).catch(err =>{
                    console.log(err);
                })
            })

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
}

module.exports = MsgController;