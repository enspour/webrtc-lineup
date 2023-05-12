export default class Logger {
    constructor(private name: string) {}

    log(message: string) {
        console.log(`[${this.name}] ${message}`);
    }
}