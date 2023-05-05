import { MediaPeersConnectionService } from "@features/media-peers-connections";

import ConferenceInfoService from "./ConferenceInfo.service";
import ConferenceSignalService from "./ConferenceSignal.service";
import ConferenceChatService from "./ConferenceChat.service";
import ConferenceWorkflowService from "./ConferenceWorkflow.service";
import ConferenceLoggerService from "./ConferenceLogger.service";

import ConferenceStore from "../stores/Conference.store";

export default class ConferenceService {
    #room;
    #user;
    #socket;

    #conferenceSignal;
    #conferenceStore;
    #conferenceInfo;
    #conferenceChat;
    #conferenceLogger;
    #conferenceWorkflow;

    #mediaPeersConnection;
    #mediaPeersConnectionDestroyer;
    
    constructor({ room, user }, socket) {
        this.#room = room;
        this.#user = user;
        this.#socket = socket;

        this.#conferenceStore = new ConferenceStore();
        
        this.#conferenceSignal = new ConferenceSignalService(socket);
        this.#conferenceInfo = new ConferenceInfoService(this.#conferenceStore, this.#conferenceSignal);
        this.#conferenceChat = new ConferenceChatService(user, this.#conferenceStore, this.#conferenceSignal);
        this.#conferenceWorkflow = new ConferenceWorkflowService(this.#conferenceStore);

        this.#conferenceLogger = new ConferenceLoggerService(this.#conferenceSignal);
    }

    initialize() {
        const conferenceSignalDestroyer = this.#conferenceSignal.initialize();
        const conferenceInfoDestroyer = this.#conferenceInfo.initialize();
        const conferenceChatDestroyer = this.#conferenceChat.initialize();
        const conferenceWorkflowDestroyer = this.#conferenceWorkflow.initialize();

        const conferenceLoggerDestroyer = this.#conferenceLogger.initialize();

        const offJoin = this.#onJoin();
        const offLeave = this.#onLeave();
        const offUserJoin = this.#onUserJoin();
        const offUserLeave = this.#onUserLeave();

        return () => {
            conferenceSignalDestroyer();
            conferenceInfoDestroyer();
            conferenceChatDestroyer();
            conferenceWorkflowDestroyer();
            
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

    get Workflow() {
        return this.#conferenceWorkflow;
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

                await this.#user.Media.captureMedia(constraints);

                this.#mediaPeersConnection = new MediaPeersConnectionService(
                    this.#conferenceInfo.Id, 
                    this.#user.Media.Stream,
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
                this.#user.Media.stopCapturedMedia();
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
                this.#user.Media.stopCapturedMedia();
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
        return this.#conferenceSignal.onConferenceUserJoined(
            async (peerId, userId) => {
                await this.#mediaPeersConnection.connect(peerId, userId)
            }
        );
    }

    #onUserLeave() {
        return this.#conferenceSignal.onConferenceUserLeft((peerId, userId) => {
            this.#mediaPeersConnection.disconnect(peerId)
        })
    }
}