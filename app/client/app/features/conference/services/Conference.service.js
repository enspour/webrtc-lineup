import { MediaPeersConnectionService } from "@features/media-peers-connections";
import ConferenceSignalService from "./ConferenceSignal.service";
import ConferenceInfoService from "./ConferenceInfo.service";
import ConferenceChatService from "./ConferenceChat.service";

import ConferenceStore from "../stores/Conference.store";
import ConferenceLoggerService from "./ConferenceLogger.service";

export default class ConferenceService {
    #userMedia;
    #room;
    #socket;

    #conferenceSignal;
    #conferenceStore;
    #conferenceInfo;
    #conferenceChat;
    #conferenceLogger;

    #mediaPeersConnection;
    #mediaPeersConnectionDestroyer;
    
    constructor({ room, user, userMedia }, socket) {
        this.#room = room;
        this.#userMedia = userMedia;
        this.#socket = socket;

        this.#conferenceSignal = new ConferenceSignalService(socket);
        this.#conferenceStore = new ConferenceStore();
        this.#conferenceInfo = new ConferenceInfoService(this.#conferenceStore, this.#conferenceSignal);
        this.#conferenceChat = new ConferenceChatService(user, this.#conferenceStore, this.#conferenceSignal);
        this.#conferenceLogger = new ConferenceLoggerService(this.#conferenceSignal);
    }

    initialize() {
        const conferenceInfoDestroyer = this.#conferenceInfo.initialize();
        const conferenceChatDestroyer = this.#conferenceChat.initialize();
        const conferenceLoggerDestroyer = this.#conferenceLogger.initialize();

        const offJoin = this.#onJoin();
        const offLeave = this.#onLeave();
        const offUserJoin = this.#onUserJoin();
        const offUserLeave = this.#onUserLeave();

        return () => {
            conferenceInfoDestroyer();
            conferenceChatDestroyer();
            conferenceLoggerDestroyer();

            offJoin();
            offLeave();
            offUserJoin();
            offUserLeave();
        }
    }

    get Connected() {
        return this.#conferenceSignal.Connected;
    }

    get Info() {
        return this.#conferenceInfo;
    }

    get Chat() {
        return this.#conferenceChat;
    }

    get Peers() {
        return this.#mediaPeersConnection.Peers;
    }

    async join(conference, constraints) {
        if (conference) {
            let waiter;
            
            const roomId = this.#room.Info.Id;
            const conferenceId = conference.id;

            if (roomId && conferenceId) {
                this.#conferenceStore.setConference(conference);

                await this.#userMedia.captureMedia(constraints);

                this.#mediaPeersConnection = new MediaPeersConnectionService(
                    this.#conferenceInfo.Id, 
                    this.#userMedia.Stream,
                    this.#conferenceInfo.Settings,
                    this.#socket
                );
                
                this.#mediaPeersConnectionDestroyer = this.#mediaPeersConnection.initialize();
                
                const clear = this.#conferenceSignal.onJoinConference((status, message, data) => {
                    if (waiter) waiter({ status, message, data });
        
                    clear();
                });
                
                this.#conferenceSignal.joinConference(roomId, conferenceId);
                
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
                const clear = this.#conferenceSignal.onLeaveConference(async (status, message, data) => {
                    if (waiter) waiter({ status, message, data });

                    clear();
                });
    
                this.#conferenceSignal.leaveConference(conferenceId);
    
                return new Promise((resolve, _) => waiter = resolve);
            }
    
            return new Error("You are not connected to room yet");
        }
    }

    #onJoin() {
        return this.#conferenceSignal.onJoinConference((status) => {
            if (status !== 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceStore.clear();
                this.#conferenceChat.clear();
                this.#mediaPeersConnection.disconnectAll();

                if (this.#mediaPeersConnectionDestroyer) {
                    this.#mediaPeersConnectionDestroyer();
                    this.#mediaPeersConnectionDestroyer = null;
                }
            }
        });
    }

    #onLeave() {
        return this.#conferenceSignal.onLeaveConference((status) => {
            if (status === 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceStore.clear();
                this.#conferenceChat.clear();
                this.#mediaPeersConnection.disconnectAll();

                if (this.#mediaPeersConnectionDestroyer) {
                    this.#mediaPeersConnectionDestroyer();
                    this.#mediaPeersConnectionDestroyer = null;
                }
            }
        })
    }

    #onUserJoin() {
        return this.#conferenceSignal.onUserJoinConference(
            async (peerId, userId) => {
                await this.#mediaPeersConnection.connect(peerId, userId)
            }
        );
    }

    #onUserLeave() {
        return this.#conferenceSignal.onUserLeaveConference((peerId, userId) => {
            this.#mediaPeersConnection.disconnect(peerId)
        })
    }
}