export default {
    auth: process.env.AUTH_SERVICE || "localhost:3010",
    signal: process.env.SIGNAL_SERVICE || "localhost:3040",
}