import { Server, Socket } from "socket.io"

const initEvents = (_io: Server) => {
    _io.on("connection", (socket: Socket) => {
        console.log("new user")
    })

    _io.on("connection", (socket: Socket) => {
        socket.on("disconnect", (reason) => {

        })
    })
}

export default initEvents