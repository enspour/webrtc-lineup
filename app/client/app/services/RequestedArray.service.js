import ArrayStore from "@stores/Array.store";
import StatusStore from "@stores/Status.store";

export default class RequestedArrayService {
    #request;
    #handlerReceivedData;

    #requestedArray;
    #requestedArrayStatus;

    constructor(request, handlerReceivedData) {
        this.#request = request;
        this.#handlerReceivedData = handlerReceivedData;

        this.#requestedArray = new ArrayStore();
        this.#requestedArrayStatus = new StatusStore();
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

    get Status() {
        return this.#requestedArrayStatus.status;
    }

    get Store() {
        return this.#requestedArray;
    }

    async update(data) {
        await this.#request.start(data);
    }

    clear() {
        this.#requestedArray.clear();
        this.#requestedArrayStatus.clear();
    }

    #onStart() {
        return this.#request.onStart(() => {
            this.#requestedArray.clear();
            this.#requestedArrayStatus.setStatus("pending");
        })
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                this.#requestedArray.clear();
                this.#requestedArray.appendMany(this.#handlerReceivedData(response.data));
                this.#requestedArrayStatus.setStatus("done");
            }
        })
    }

    #onError() {
        return this.#request.onError(error => {
            if (error) {
                this.#requestedArray.clear();
                this.#requestedArrayStatus.setStatus("error");
            }
        });
    }
}