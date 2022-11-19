import { nanoid } from "nanoid";

import { repository } from "core/database/src/connection";

const CONFERENCE_ID_LENGTH = 12;

class ConferenceService {
    async create(roomId: bigint, userId: bigint, name: string, description: string) {
        const conferenceId = nanoid(CONFERENCE_ID_LENGTH);
        return await repository.createConference(conferenceId, name, description, roomId, userId);
    }

    async delete(roomId: bigint, conferenceId: string, userId: bigint) {
        return await repository.deleteConference(conferenceId, roomId, userId);
    }

    async updateEnableAudio(roomId: bigint, conferenceId: string, userId: bigint, enableAudio: boolean) {
        return await repository.updateConferenceSettingsEnableAudio(roomId, conferenceId, userId, enableAudio);
    }

    async updateEnableVideo(roomId: bigint, conferenceId: string, userId: bigint, enableVideo: boolean) {
        return await repository.updateConferenceSettingsEnableVideo(roomId, conferenceId, userId, enableVideo);
    }
}

export default new ConferenceService;