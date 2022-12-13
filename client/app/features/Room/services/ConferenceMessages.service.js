import { nanoid } from "nanoid";

import API from "@api/API";
import MessagesAPI from "@api/MessagesAPI";

import RequestedArrayService from "app/services/RequestedArray.service";

import handlerMessage from "@utils/handlersReceivedData/handlerMessage";
import handlerDataMessages from "@utils/handlersReceivedData/handlerDataMessages";

export default class ConferenceMessagesService {
    #conferenceInfo;

    #signal;
    #user;

    #messages;

    constructor({ signal, user }, conferenceInfo) {
        this.#conferenceInfo = conferenceInfo;

        this.#signal = signal;
        this.#user = user;

        this.#messages = new RequestedArrayService(
            API.createRequest(MessagesAPI.findAll), 
            handlerDataMessages
        );
    }

    initialize() {
        const messagesDestoryer = this.#messages.initialize();

        const offSendMessage = this.#onSendMessage();
        const offNewMessage = this.#onNewMessage();

        return () => {
            messagesDestoryer();

            offSendMessage();
            offNewMessage();
        }
    }

    get Messages() {
        return this.#messages.Array;
    }

    sendMessage(text) {
        const conferenceId = this.#conferenceInfo.Id;

        if (conferenceId) {
            const tempId = nanoid();

            this.#signal.sendMessage(conferenceId, tempId, text);

            const message = {
                id: tempId,
                text,
                owner: this.#user.toObject(),
                createdAt: Date.now(),
                modifiedAt: Date.now()
            }

            this.#messages.Store.append(message);
        }
    }

    async update() {
        const conference_id = this.#conferenceInfo.Id;
        await this.#messages.update({ params: { conference_id } });
    }
    
    #onSendMessage() {
        return this.#signal.onSendMessage((status, message, data) => {
            if (status === 200) {
                const { tempId, message } = data;
                
                const index = this.#messages.Array.findIndex(item => item.id === tempId);
                if (index !== -1) {
                    this.#messages.Store.remove(index);
                    this.#messages.Store.append(handlerMessage(message));
                }
            }
        });
    }

    #onNewMessage() {
        return this.#signal.onNewMessage(message => {
            this.#messages.Store.append(handlerMessage(message));
        });
    }
}