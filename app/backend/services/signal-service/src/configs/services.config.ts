export default {
    auth: process.env.AUTH_SERVICE || "localhost:3010",
    room: process.env.ROOM_SERVICE || "localhost:3030",
    chat: process.env.CHAT_SERVICE || "localhost:3020",
}