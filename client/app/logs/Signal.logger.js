import Logger from "./Logger";

class SignalLogger {
    constructor() {
        this.logger = new Logger("Signal");
    }

    initialize(signal) {
        signal.onJoinRoom((status, message, data) => {
            this.logger.log(
                `Trying to connect to room! Result of connection: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        signal.onLeaveRoom((status, message, data) => {
            this.logger.log(
                `Trying to leave from room! Result of leaving: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        signal.onRoomInformationUpdate(room => {
            this.logger.log(
                `Information of room will be updated: \n` + 
                `${JSON.stringify(room, null, 4)}`
            )
        });

        signal.onJoinConference((status, message, data) => {
            this.logger.log(
                `Trying to join to conference! Result of joining: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        signal.onLeaveConference((status, message, data) => {
            this.logger.log(
                `Trying to leave from conference! Result of leaving: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        signal.onConferenceInformationUpdate(conference => {
            this.logger.log(
                `Information of conference will be updated: \n` + 
                `${JSON.stringify(conference, null, 4)}`
            )
        });

        signal.onUserJoinRoom((socketId) => {
            this.logger.log(`User connected to the room! Socket id of user: ${socketId}`)
        });
    
        signal.onUserLeaveRoom((socketId) => {
            this.logger.log(`User leaved from room! Socket id of user: ${socketId}`)
        });
    
        signal.onUserJoinConference(socketId => {
            this.logger.log(`User joined to conference! Socket id of user: ${socketId}`)
        });
    
        signal.onUserLeaveConference(socketId => {
            this.logger.log(`User leaved from conference! Socket id of user: ${socketId}`)
        });

        signal.onConnectionError((err) => {
            this.logger.log(`Connection Error! Info: ${err}`)
        });
    
        signal.onDisconnect((reason) => {
            this.logger.log(`You're disconnecting! Reason: ${reason}`)
        });
    
        signal.onSendOffer((status, message, data) => {
            this.logger.log(
                `Offer has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });
        
        signal.onSendAnswer((status, message, data) => {
            this.logger.log(
                `Answer has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });
    
        signal.onSendIceCandidate((status, message, data) => {
            this.logger.log(
                `Ice Candidate has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });
    
        signal.onSendMessage((status, message, data) => {
            this.logger.log(
                `Message has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });
    }
}

export default new SignalLogger();