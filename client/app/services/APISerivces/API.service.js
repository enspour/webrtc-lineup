export default class APIService {
    createRequest(makeRequest) {
        let response;

        let controller = new AbortController();

        return {
            wait: async () => await response, 
            cancel: () => controller.abort(),
            start: data => {
                controller.abort();
                controller = new AbortController();
                response = makeRequest(data, controller.signal);
            }
        }
    }
}