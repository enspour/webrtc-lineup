export default {
    auth: process.env.AUTH_SERVICE || "http://localhost:3010",
    room: process.env.ROOM_SERVICE || "http://localhost:3020",
    chat: process.env.CHAT_SERVICE || "http://localhost:3040",
}