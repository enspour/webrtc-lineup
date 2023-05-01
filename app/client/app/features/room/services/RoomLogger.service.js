import Logger from "@logs/Logger";

export default class RoomLoggerService {
    #roomSignal;
    #logger;

    constructor(roomSignal) {
        this.#roomSignal = roomSignal;

        this.#logger = new Logger("Room Logger");
    }

    initialize() {
        const offJoinRoom = this.#roomSignal.onJoinRoom((status, message, data) => {
            this.#logger.log(
                `Trying to connect to room! Result of connection: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offLeaveRoom = this.#roomSignal.onLeaveRoom((status, message, data) => {
            this.#logger.log(
                `Trying to leave from room! Result of leaving: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offUserJoinRoom = this.#roomSignal.onUserJoinRoom((socketId) => {
            this.#logger.log(`User connected to the room! Socket id of user: ${socketId}`)
        });
    
        const offUserLeaveRoom = this.#roomSignal.onUserLeaveRoom((socketId) => {
            this.#logger.log(`User leaved from room! Socket id of user: ${socketId}`)
        });

        const offRoomInformationUpdate = this.#roomSignal.onRoomInformationUpdate(room => {
            this.#logger.log(
                `Information of room will be updated: \n` + 
                `${JSON.stringify(room, null, 4)}`
            )
        });

        const offConferenceInformationUpdate = this.#roomSignal.onConferenceInformationUpdate(conference => {
            this.#logger.log(
                `Information of conference will be updated: \n` + 
                `${JSON.stringify(conference, null, 4)}`
            )
        });

        return () => {
            offJoinRoom();
            offLeaveRoom();
            offUserJoinRoom();
            offUserLeaveRoom();
            offRoomInformationUpdate();
            offConferenceInformationUpdate();
        }
    }
}