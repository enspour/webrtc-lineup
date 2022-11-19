const handlerConference = conference => {
    return {
        id: conference.id,
        name: conference.name,
        description: conference.description,
        settings: {
            enableAudio: conference.settings.enable_audio,
            enableVideo: conference.settings.enable_video,
        },
        modifiedAt: conference.modified_at,
        createdAt: conference.created_at,
    }
}

export default handlerConference;