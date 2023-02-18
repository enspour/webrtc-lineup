export default class Logger {
    constructor(name) {
        this.name = name;
    }

    log(logs) {
        let string = logs;

        if (typeof logs === "function") {
            string = logs();
        }

        console.log(`--[${this.name}] [${new Date().toLocaleString()}]\n${string}`);
    }
}