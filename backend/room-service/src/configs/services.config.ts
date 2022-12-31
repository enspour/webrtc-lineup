export default {
    signal: process.env.SIGNAL_SERVICE || "http://localhost:3030",
    auth: process.env.AUTH_SERVICE || "http://localhost:3010"
}