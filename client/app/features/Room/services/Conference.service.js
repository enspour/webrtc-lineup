import ConferenceInfoService from "./ConferenceInfo.service";
import ConferenceMediaPeersService from "./ConferenceMediaPeers.service";
import ConferenceMessagesService from "./ConferenceMessages.service";

export default class ConferenceService {
    #conferenceInfo;

    #room;
    #signal;
    #userMedia;
    
    #mediaPeers;
    #messages;
    
    constructor(services) {
        this.#conferenceInfo = new ConferenceInfoService();

        this.#room = services.room;
        this.#signal = services.signal;
        this.#userMedia = services.userMedia;
        
        this.#mediaPeers = new ConferenceMediaPeersService(services, this.#conferenceInfo);
        this.#messages = new ConferenceMessagesService(services, this.#conferenceInfo);
    }

    initialize() {
        const peersDestroyer = this.#mediaPeers.initialize();
        const messagesDestoryer = this.#messages.initialize();

        const offJoin = this.#onJoin();
        const offLeave = this.#onLeave();

        return () => {
            peersDestroyer();
            messagesDestoryer();

            offJoin();
            offLeave();
        }
    }

    get Info() {
        return this.#conferenceInfo;
    }

    get Peers() {
        return this.#mediaPeers.Peers;
    }
    
    get Messages() {
        return this.#messages.Messages;
    }

    async join(conference, constraints) {
        if (conference) {
            let waiter;
            
            const roomId = this.#room.Info.Id;
            const conferenceId = conference.id;

            if (roomId && conferenceId) { 
                this.#conferenceInfo.setConference(conference);
                await this.#userMedia.captureMedia(constraints);
        
                const clear = this.#signal.onJoinConference((status, message, data) => {
                    if (waiter) waiter({ status, message, data });
        
                    clear();
                });
                
                this.#signal.joinConference(roomId, conferenceId);
                
                return new Promise((resolve, _) => waiter = resolve);
            }
        
            return new Error("You are not connected to room yet");
        }
    }

    async leave() {
        const conferenceId = this.#conferenceInfo.Id;

        if (conferenceId) {
            let waiter;
    
            const roomId = this.#room.Info.Id;
    
            if (roomId && conferenceId) {
                const clear = this.#signal.onLeaveConference(async (status, message, data) => {
                    if (waiter) waiter({ status, message, data });

                    clear();
                });
    
                this.#signal.leaveConference(conferenceId);
    
                return new Promise((resolve, _) => waiter = resolve);
            }
    
            return new Error("You are not connected to room yet");
        }
    }

    sendMessage(text) {
        this.#messages.sendMessage(text);
    }

    #onJoin() {
        return this.#signal.onJoinConference((status) => {
            if (status === 200) {
                this.#messages.update();
            }

            if (status !== 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceInfo.clear();
            }
        });
    }

    #onLeave() {
        return this.#signal.onLeaveConference((status) => {
            if (status === 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceInfo.clear();
            }
        })
    }
}