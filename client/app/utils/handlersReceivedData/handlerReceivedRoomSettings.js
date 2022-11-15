const handlerReceivedRoomSettings = settings => {
    return {
        visibility: settings.visibility,
        enableAudio: settings.enable_audio,
        enableVideo: settings.enable_video, 
    }
}

export default handlerReceivedRoomSettings;