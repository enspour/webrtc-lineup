import RequestedArrayService from "app/services/RequestedArray.service";
import RoomInfoService from "./RoomInfo.service";

import handlerDataConferencesIntoStates from "@utils/handlersReceivedData/handlerDataConferencesIntoStates";
import handlerRoom from "@utils/handlersReceivedData/handlerRoom";
import handlerConference from "@utils/handlersReceivedData/handlerConference";

export default class RoomService {
    #roomInfo;
    #conferences;
    #signal;

    constructor(signal, API, roomAPI, conferencesAPI) {
        this.#signal = signal;

        this.#roomInfo = new RoomInfoService(API.createRequest(roomAPI.findOne));
        this.#conferences = new RequestedArrayService(
            API.createRequest(conferencesAPI.findAll),
            handlerDataConferencesIntoStates
        );
    }

    initialize() {
        this.#roomInfo.initialize();
        this.#conferences.initialize();

        const offJoinRoom = this.#onJoinRoom();
        const offUpdateRoomInfo = this.#onUpdateRoomInfo();
        const offUpdateConferenceInfo = this.#onUpdateConferenceInfo();

        return () => {
            offJoinRoom();
            offUpdateRoomInfo();
            offUpdateConferenceInfo();
        }
    }

    get Connected() {
        return this.#signal.Connected;
    }

    get Info() {
        return this.#roomInfo;
    }

    get Conferences() {
        return this.#conferences;
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
            
            const index = this.#conferences.Array.findIndex(item => item.id === conference.id);
            if (index !== -1) {
                this.#conferences.Array[index].setConference(conference);
            }
        });
    }
}