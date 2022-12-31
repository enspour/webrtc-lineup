import { action, makeAutoObservable, observable } from "mobx";

export default class DevicesStore {
    devices = [];
    selectedDevice = { deviceId: "", label: "None" };

    constructor() {
        makeAutoObservable(this, {
            devices: observable,
            selectedDevice: observable,
            
            setDevices: action,
            setSelectedDevice: action,
        });
    }

    setDevices(devices) {
        this.devices = devices;
    }

    setSelectedDevice(device) {
        this.selectedDevice = device;
    } 
}