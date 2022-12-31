export const signalLogger = (signal) => {
    signal.onJoinRoom((status, message, data) => console.log(status, message, data))
    signal.onLeaveRoom((status, message, data) => console.log(status, message, data))
    signal.onUserJoinRoom((socketId) => console.log("user connected to room", socketId))
    signal.onUserLeaveRoom((socketId) => console.log("user leaved from room", socketId))
    signal.onConnectionError((err) => console.log("unknown error", err));
    signal.onDisconnect((reason) => console.log("disconnecting, reason:", reason))
    signal.onRoomInformationUpdate(room => console.log(room));
    signal.onConferenceInformationUpdate(conference => console.log(conference));

    signal.onSendOffer((status, message, data) => console.log(status, message, data))
    signal.onSendAnswer((status, message, data) => console.log(status, message, data))
    signal.onSendIceCandidate((status, message, data) => console.log(status, message, data))
    signal.onUserJoinConference(socketId => console.log("User join to conference", socketId))
    signal.onUserLeaveConference(socketId => console.log("User leave to conference", socketId))

    signal.onSendMessage((status, message, data) => console.log(status, message, data))
}