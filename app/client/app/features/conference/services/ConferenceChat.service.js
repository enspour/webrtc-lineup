import { nanoid } from "nanoid";

import API from "@api/API";
import MessagesAPI from "@api/MessagesAPI";

import RequestedArrayService from "@services/RequestedArray.service";

import transformToConferenceMessage from "../utils/transformToConferenceMessage";
import transformToConferenceMessages from "../utils/transformToConferenceMessages";

export default class ConferenceChatService {
    #user;

    #conferenceStore;

    #conferenceSignal;
    #conferenceMessages;

    constructor(user, conferenceStore, conferenceSignal) {
        this.#user = user;

        this.#conferenceStore = conferenceStore;
        
        this.#conferenceSignal = conferenceSignal;
        this.#conferenceMessages = new RequestedArrayService(
            API.createRequest(MessagesAPI.findAll), 
            (data) => transformToConferenceMessages(data.body.messages)
        );
    }
    
    initialize() {
        const messagesDestroyer = this.#conferenceMessages.initialize();

        const offSendMessageConferenceChat = this.#onSendMessageConferenceChat();
        const offConferenceChatNewMessage = this.#onConferenceChatNewMessage();

        return () => {
            messagesDestroyer();

            offSendMessageConferenceChat();
            offConferenceChatNewMessage();
        }
    }

    get Messages() {
        return this.#conferenceMessages.Array;
    }

    get Status() {
        return this.#conferenceMessages.Status;
    }

    clear() {
        this.#conferenceMessages.clear();
    }

    sendMessage(text) {
        const conferenceId = this.#conferenceStore.id;

        if (conferenceId) {
            const tempId = nanoid();

            this.#conferenceSignal.sendMessageConferenceChat(conferenceId, tempId, text);

            const message = {
                id: tempId,
                text,
                owner: this.#user.Info.toObject(),
                createdAt: Date.now(),
                modifiedAt: Date.now()
            }

            this.#conferenceMessages.Store.append(message);
        }
    }

    async update() {
        const params = { conference_id: this.#conferenceStore.id };
        await this.#conferenceMessages.update({ params });
    }

    #onSendMessageConferenceChat() {
        return this.#conferenceSignal.onSendMessageConferenceChat((status, message, data) => {
            if (status === 200) {
                const { tempId, message } = data;
                
                const index = this.#conferenceMessages.Array.findIndex(item => item.id === tempId);
                if (index !== -1) {
                    this.#conferenceMessages.Store.remove(index);
                    this.#conferenceMessages.Store.append(transformToConferenceMessage(message));
                }
            }
        });
    }

    #onConferenceChatNewMessage() {
        return this.#conferenceSignal.onConferenceChatNewMessage(message => {
            this.#conferenceMessages.Store.append(transformToConferenceMessage(message));
        });
    }
}