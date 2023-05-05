import Logger from "@logs/Logger";

export default class MediaPeersConnectionLogger {
    #mediaPeerConnectionSignal;
    #logger;

    constructor(mediaPeerConnectionSignal) {
        this.#mediaPeerConnectionSignal = mediaPeerConnectionSignal;

        this.#logger = new Logger("MediaPeersConnection Logger");
    }

    initialize() {
        const offSendOffer = this.#mediaPeerConnectionSignal.onSendOffer((status, message, data) => {
            this.#logger.log(
                `Offer has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offAcceptOffer = this.#mediaPeerConnectionSignal.onAcceptOffer((peerId, userId, offer) => {
            this.#logger.log(
                `Offer has been accepted! Result of sending: \n` +
                `PeerId: ${peerId}, \n` + 
                `UserId: ${userId}, \n` +
                `Offer: ${offer}`
            )
        });        
        
        const offSendAnswer = this.#mediaPeerConnectionSignal.onSendAnswer((status, message, data) => {
            this.#logger.log(
                `Answer has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offAcceptAnswer = this.#mediaPeerConnectionSignal.onAcceptAnswer((peerId, userId, answer) => {
            this.#logger.log(
                `Answer has been accepted! Result of sending: \n` +
                `PeerId: ${peerId}, \n` + 
                `UserId: ${userId}, \n` +
                `Answer: ${answer}`
            )
        });
    
        const offSendIceCandidate = this.#mediaPeerConnectionSignal.onSendIceCandidate((status, message, data) => {
            this.#logger.log(
                `Ice Candidate has been sent! Result of sending: \n` +
                `Status: ${status}, \n` + 
                `Message: ${message}, \n` +
                `Data: ${JSON.stringify(data, null, 4)}`
            )
        });

        const offAcceptIceCandidate = this.#mediaPeerConnectionSignal.onAcceptIceCandidate((socketId, iceCandidate) => {
            this.#logger.log(
                `IceCandidate has been sent! Result of sending: \n` +
                `SocketId: ${socketId}, \n` + 
                `iceCandidate: ${iceCandidate}, \n`
            )
        })

        return () => {
            offSendOffer();
            offAcceptOffer();
            offSendAnswer();
            offAcceptAnswer();
            offSendIceCandidate();
            offAcceptIceCandidate();
        }
    }
}