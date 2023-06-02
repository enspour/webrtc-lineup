export default {
    auth: process.env.AUTH_SERVICE || "localhost:3010",
    chat: process.env.CHAT_SERVICE || "localhost:3020",
    room: process.env.ROOM_SERVICE || "localhost:3030",
    signal: process.env.SIGNAL_SERVICE || "localhost:3040",
}