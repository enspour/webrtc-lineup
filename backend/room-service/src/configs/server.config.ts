export default {
    port: process.env.PORT || 3020,
    environment: process.env.ENVIRONMENT || "development",
    backend: process.env.BACKEND || "http://localhost:8080",
}