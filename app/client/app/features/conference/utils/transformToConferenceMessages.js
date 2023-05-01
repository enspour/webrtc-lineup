import transformToConferenceMessage from "./transformToConferenceMessage";

const transformToConferenceMessages = messages => {
    return messages.map(item => transformToConferenceMessage(item))
}

export default transformToConferenceMessages;