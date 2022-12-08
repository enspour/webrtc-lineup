import ArrayStore from "@stores/Array.store";
import StateStore from "@stores/State.store";

export default class RequestedArrayService {
    #request;
    #handlerReceivedData;

    #requestedArray;
    #requestedArrayState;

    constructor(request, handlerReceivedData) {
        this.#request = request;
        this.#handlerReceivedData = handlerReceivedData;

        this.#requestedArray = new ArrayStore();
        this.#requestedArrayState = new StateStore();
    }

    initialize() {
        const offStart = this.#onStart();
        const offResponse = this.#onResponse();
        const offError = this.#onError();

        return () => {
            offStart();
            offResponse();
            offError();
        }
    }

    get Array() {
        return this.#requestedArray.array;
    }

    get State() {
        return this.#requestedArrayState.state;
    }

    async update(data) {
        await this.#request.start(data);
    }

    clear() {
        this.#requestedArray.clear();
        this.#requestedArrayState.clear();
    }

    #onStart() {
        return this.#request.onStart(() => {
            this.#requestedArray.clear();
            this.#requestedArrayState.setState("pending");
        })
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                this.#requestedArray.clear();
                this.#requestedArray.appendMany(this.#handlerReceivedData(response.data));
                this.#requestedArrayState.setState("done");
            }
        })
    }

    #onError() {
        return this.#request.onError(error => {
            if (error) {
                this.#requestedArray.clear();
                this.#requestedArrayState.setState("error");
            }
        });
    }
}