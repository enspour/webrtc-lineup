import handlerMessage from "./handlerMessage";

const handlerDataMessages = data => {
    return data.body.messages
        .map(item => handlerMessage(item))
}

export default handlerDataMessages;