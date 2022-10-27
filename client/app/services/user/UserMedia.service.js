import { autorun } from "mobx";

import DevicesStore from "@store/Devices.store";

export default class UserMedia {
    #inputAudioDevices;
    #inputVideoDevices;

    constructor() {
        this.#inputAudioDevices = new DevicesStore();
        this.#inputVideoDevices = new DevicesStore();
    }

    initialize() {
        this.#updateDevices();

        const offChangingAudioInputDevices = this.#onChangingAudioInputDevices();
        const offChangingVideoInputDevices = this.#onChangingVideoInputDevices();
        const offUpdatingChangedDevices = this.#onUpdatingChangedDevices();

        return () => {
            offChangingAudioInputDevices();
            offChangingVideoInputDevices();
            offUpdatingChangedDevices();
        }
    }

    get AudioInputs() {
        return this.#inputAudioDevices.devices;
    }

    get VideoInputs() {
        return this.#inputVideoDevices.devices;
    }

    get SelectedAudioInputDevice() {
        return this.#inputAudioDevices.selectedDevice;
    }

    get SelectedVideoInputDevice() {
        return this.#inputVideoDevices.selectedDevice;
    }

    setSelectedAudioInputDevice(deviceId) {
        const device = this.AudioInputs.find(item => item.deviceId === deviceId);
        if (device) {
            this.#inputAudioDevices.setSelectedDevice(device);
        }
    } 

    setSelectedVideoInputDevice(deviceId) {
        const device = this.VideoInputs.find(item => item.deviceId === deviceId);
        if (device) {
            this.#inputVideoDevices.setSelectedDevice(device);
        }
    } 

    async checkAudioInputPermission() {
        this.#checkPermission({ audio: true })
    }

    async checkVideoInputPermission() {
        this.#checkPermission({ video: true })
    }

    async captureMedia(constraints) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
            return new Error("Disable access to user media.")
        }
    }

    stopCapturedMedia(media) {
        if (media) {
            media.getTracks().forEach(track => track.stop());
        }
    }

    async #checkPermission(constraints) {
        const stream = await this.captureMedia(constraints);
        this.stopCapturedMedia(stream);
        await this.#updateDevices();
    }

    async #getConnectedDevices(type) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === type)
    }
    
    async #updateDevices() {
        const audios = await this.#getConnectedDevices('audioinput');
        const cameras = await this.#getConnectedDevices('videoinput');
        
        this.#inputAudioDevices.setDevices(audios);
        this.#inputVideoDevices.setDevices(cameras);
    }

    #onUpdatingChangedDevices() {
        const updateDevicesEvent = async () => await this.#updateDevices();
        navigator.mediaDevices.addEventListener("devicechange", updateDevicesEvent);
        return () => navigator.mediaDevices.removeEventListener("devicechange", updateDevicesEvent);
    }

    #onChangingAudioInputDevices() {
        return autorun(() => {
            if (this.AudioInputs.length > 0) {
                const device = this.AudioInputs
                    .find(item => item.deviceId === this.SelectedAudioInputDevice.deviceId);
                
                if (!device) {
                    this.setSelectedAudioInputDevice(this.AudioInputs[0].deviceId);
                }
            }
        })
    }

    #onChangingVideoInputDevices() {
        return autorun(() => {
            if (this.VideoInputs.length > 0) {
                const device = this.VideoInputs
                    .find(item => item.deviceId === this.SelectedVideoInputDevice.deviceId);

                if (!device) {
                    this.setSelectedVideoInputDevice(this.VideoInputs[0].deviceId);
                }
            }
        })
    }
}