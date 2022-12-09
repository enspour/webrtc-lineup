import services from "@services";
import AuthAPI from "./AuthAPI";

const RequestEvents = {
    START: "request/start",
    END: "request/end",
    ERROR: "request/error"
}

class Request {
    constructor(wrappedRequest) {
        this.wrappedRequest = wrappedRequest;
        this.error = null;
        this.response = null;
        this.count = 0;
        this.eventTarget = new EventTarget();
    }

    async start(data) {
        this.wrappedRequest.start(data);
        this.count += 1;
        
        this.eventTarget.dispatchEvent(new Event(RequestEvents.START));

        try {
            this.response = await this.wrappedRequest.wait();
            this.error = null;
            this.count -= 1;
            this.eventTarget.dispatchEvent(new Event(RequestEvents.END));
        } catch (err) {
            this.count -= 1;

            if (this.count === 0) {
                const isRefreshTokens = await this.#tryRefreshTokens(err);
                if (isRefreshTokens) {
                    return await this.start(data);
                }

                this.error = err;
                this.eventTarget.dispatchEvent(new Event(RequestEvents.ERROR));
            }
        }
    }

    async #tryRefreshTokens(error) {
        if (error.response && error.response.status === 401) {
            const response = await AuthAPI.refresh();
            if (response.status === 200) {
                return true;
            }
        }

        return false;
    } 

    onError(handler) {
        const _event = () => handler(this.error);
        this.eventTarget.addEventListener(RequestEvents.ERROR, _event);
        return () => this.eventTarget.removeEventListener(RequestEvents.ERROR, _event);
    }

    onStart(handler) {
        const _event = () => handler();
        this.eventTarget.addEventListener(RequestEvents.START, _event);
        return () => this.eventTarget.removeEventListener(RequestEvents.START, _event);
    } 

    onResponse(handler) {
        const _event = () => handler(this.response);
        this.eventTarget.addEventListener(RequestEvents.END, _event);
        return () => this.eventTarget.removeEventListener(RequestEvents.END, _event);
    }
}


class API { 
    createRequest(requestMethod) {
        const wrappedRequest = this.#wrapRequest(requestMethod);
        return new Request(wrappedRequest);
    }

    #wrapRequest(requestMethod) {
        let response;

        let controller = new AbortController();

        return {
            wait: async () => await response, 
            cancel: () => controller.abort(),
            start: data => {
                controller.abort();
                controller = new AbortController();
                response = requestMethod(data, controller.signal);
            }
        }
    }
}

export default new API();