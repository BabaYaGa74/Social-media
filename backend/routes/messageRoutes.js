const express = require("express");
const router = express.Router();

const MsgController = require("../controllers/messageController");

const messageRoutes = (io) => {
    const msgController = new MsgController(io);

    router.get("/msg",msgController.setupSocketEvent);
    return router;
}

module.exports = messageRoutes;