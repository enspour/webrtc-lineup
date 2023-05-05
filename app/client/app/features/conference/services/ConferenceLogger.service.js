import Logger from "@logs/Logger";

export default class ConferenceLoggerService {
    #conferenceSignal;
    #logger;

    constructor(conferenceSignal) {
        this.#conferenceSignal = conferenceSignal;

        this.#logger = new Logger("Conference Logger");
    }

    initialize() {
        const offJoinConference = this.#conferenceSignal.onJoinConference((status, message, data) => {
            this.#logger.log(
                `Trying to join to conference! Result of joining: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offLeaveConference = this.#conferenceSignal.onLeaveConference((status, message, data) => {
            this.#logger.log(
                `Trying to leave from conference! Result of leaving: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offConferenceUserJoined = this.#conferenceSignal.onConferenceUserJoined(socketId => {
            this.#logger.log(`User joined to conference! Socket id of user: ${socketId}`)
        });
    
        const offConferenceUserLeft = this.#conferenceSignal.onConferenceUserLeft(socketId => {
            this.#logger.log(`User leaved from conference! Socket id of user: ${socketId}`)
        });

        const offConferenceInfoUpdated = this.#conferenceSignal.onConferenceInfoUpdated(conference => {
            this.#logger.log(
                `Information of conference will be updated: \n` + 
                `${JSON.stringify(conference, null, 4)}`
            )
        });

        const offSendMessageConferenceChat = this.#conferenceSignal.onSendMessageConferenceChat((status, message, data) => {
            this.#logger.log(
                `Message has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        return () => {
            offJoinConference();
            offLeaveConference();
            offConferenceUserJoined();
            offConferenceUserLeft();
            offConferenceInfoUpdated();
            offSendMessageConferenceChat();
        }
    }
}