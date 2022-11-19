import RequestedArrayService from "app/services/RequestedArray.service";
import SignalService from "./SignalService/Signal.service";
import ConferenceService from "./Conference.service";
import RoomInfoService from "./RoomInfo.service";

import handlerDataConferencesIntoStates from "@utils/handlersReceivedData/handlerDataConferencesIntoStates";
import handlerRoom from "@utils/handlersReceivedData/handlerRoom";
import handlerConference from "@utils/handlersReceivedData/handlerConference";

export default class RoomService {
    #signal;
    #conference;

    #roomInfo;
    #conferencesInfo;

    constructor(API, roomAPI, conferencesAPI, userMedia) {
        this.#roomInfo = new RoomInfoService(API.createRequest(roomAPI.findOne));
        this.#conferencesInfo = new RequestedArrayService(
            API.createRequest(conferencesAPI.findAll),
            handlerDataConferencesIntoStates
        );

        this.#signal = new SignalService();
        this.#conference = new ConferenceService(this.#signal, this.#roomInfo, userMedia);
    }

    initialize() {
        this.#roomInfo.initialize();
        this.#conferencesInfo.initialize();
        this.#conference.initialize();

        this.#signal.onJoinRoom((status, message, data) => console.log(status, message, data))
        this.#signal.onLeaveRoom((status, message, data) => console.log(status, message, data))
        this.#signal.onUserJoinRoom((socketId) => console.log("user connected to room", socketId))
        this.#signal.onUserLeaveRoom((socketId) => console.log("user leaved from room", socketId))
        this.#signal.onConnectionError((err) => console.log("unknow error", err));
        this.#signal.onDisconnect((reason) => console.log("disconnecting, reason:", reason))
        this.#signal.onRoomInformationUpdate(room => console.log(room));
        this.#signal.onConferenceInformationUpdate(conference => console.log(conference));

        const offJoinRoom = this.#onJoinRoom();
        const offUpdateRoomInfo = this.#onUpdateRoomInfo();
        const offUpdateConferenceInfo = this.#onUpdateConferenceInfo();

        return () => {
            offJoinRoom();
            offUpdateRoomInfo();
            offUpdateConferenceInfo();
        }
    }

    get Conference() {
        return this.#conference;
    }

    get RoomInfo() {
        return this.#roomInfo;
    }

    get ConferencesInfo() {
        return this.#conferencesInfo;
    }

    get Connected() {
        return this.#signal.Connected;
    }

    async join(id, password) {
        let waiter;

        if (!this.#signal.Active) {
            const clear = this.#signal.onJoinRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            this.#signal.connect();
            this.#signal.join(id, password);

            return new Promise((resolve, _) => waiter = resolve);
        }
        
        return new Error("You are connecting");
    }

    async leave() {
        let waiter;

        if (this.#signal.Active) {
            const clear = this.#signal.onLeaveRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            const id = this.#roomInfo.Id;
            this.#signal.leave(id);

            return new Promise((resolve, _) => waiter = resolve);
        }

        return new Error("You are not connected yet");
    }

    async getUsers() {
        const id = this.#roomInfo.Id;
        
        return new Promise((resolve, _) => {
            this.#signal.onceUsers((status, message, data) => {
                resolve({ status, message, data });
            })
            
            this.#signal.getUsers(id)
        });
    }

    #onJoinRoom() {
        return this.#signal.onJoinRoom((status, _, data) => {
            if (status === 200) {
                if (data) {
                    const room = handlerRoom(data);
                    this.#roomInfo.setRoom(room);
                }

                return;
            }

            this.#signal.disconnect();
        });
    }

    #onUpdateRoomInfo() {
        return this.#signal.onRoomInformationUpdate((data) => {
            const room = handlerRoom(data);
            this.#roomInfo.setRoom(room);
        });
    }

    #onUpdateConferenceInfo() {
        return this.#signal.onConferenceInformationUpdate((data) => {
            const conference = handlerConference(data);
            
            const index = this.#conferencesInfo.Array.findIndex(item => item.id === conference.id);
            if (index !== -1) {
                this.#conferencesInfo.Array[index].setConference(conference);
            }
        });
    }
}